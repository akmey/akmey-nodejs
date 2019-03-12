#!/usr/bin/env node
/*
Akmey client
Licensed under GPLv3
(c) 2019 - Akmey contributors
*/

const akmey = require('./api');
const program = require('commander');
const ora = require('ora');
const spinner = ora('Hello, loading Akmey client').start();
const configstore = require('configstore');
const conf = new configstore('akmey-client-js');
const path = require('path');
const fs = require('fs');
const md5 = require('md5');

class AkmeyFile {
    constructor(filepath, filecontent) {
        this.re = /#-- Akmey\.js START Nonce:([A-Za-z0-9]+) --\n((?:.|\n)+)\n#-- Akmey\.js STOP --/;
        this.path = filepath;
        this.content = filecontent;
        var result = this.re.exec(this.content.toString());
        if (result === null) {
            var str = filecontent.toString();
            str += '\n#-- Akmey.js START Nonce:' + md5(this.path) + ' --\n\n\n#-- Akmey.js STOP --\n';
            // console.log(str);
            fs.writeFileSync(this.path, str);
            this.content = str;
            this.result = this.re.exec(this.content.toString());
        } else {
            this.result = result;
        }
        // console.log(this.result);
    }
}

function start() {
    var db = 'default';
    var api = new akmey.UserApi();
    // var re = /#-- Akmey\.js START Nonce:([A-Za-z0-9]+) --\n((?:.|\n)+)\n#-- Akmey\.js STOP --/;

    function setPath(param) {
        if (fs.existsSync(param)) {
            // Now we parse the nonce
            fullpath = path.resolve(param); // Resolve the full path
            filecontent = fs.readFileSync(fullpath);
            db = new AkmeyFile(fullpath, filecontent);
            return true;
        } else {
            spinner.fail('The target file (-t; ' + param + ') does not exist');
            process.exit(1);
        }
    }

    function installKey(cmd, options) {
        spinner.succeed();
        var getspin = ora('Searching for user ' + cmd).start();
        api.userMatchQueryGet(cmd).then(data => {
            getspin.succeed();
            console.log(data.keys);
            conf.set('user.'+data.name, data);
        }, error => {
            getspin.fail('Cannot find user ' + cmd);
        });
    }

    program.version('0.0.1-alpha')
        .description('Akmey client can retreive keys from Akmey server and help you to manage it here.')
        .option('-t, --target [path]', 'Target file, where to add keys or remove keys', setPath);

    program.command('install <user>')
        .alias('i')
        .option('-k, --key [keyname]', 'Add a specific key only')
        .action(installKey);

    program.command('remove <user>')
        .alias('r')
        .action(installKey);

    program.command('*')
        .action(function(env) {
            console.log('HEY!');
            spinner.fail('Unknown command');
        });

    // console.log(program);

    // if (!program.args.length) program.help();

    program.parse(process.argv);
    
    // if (program.target) {
    //     if (!require('fs').existsSync(program.target)) {
    //         spinner.fail('The target file does not exists.');
    //         return;
    //     } else {
    //         return;
    //     }
    // }
}

if (!conf.has('installed')) {
    spinner.warn();
    const chalk = require('chalk');
    const inquirer = require('inquirer');
    console.log(chalk.yellow('It looks that\'s the first time you use Akmey here. We will ask you some questions before we can continue.'));
    inquirer.prompt([
        {
            name: 'sshfilepath',
            message: 'Where is your SSH authorized_keys file (this file must exist) ?',
            default: require('os').homedir() + '/.ssh/authorized_keys',
            validate: function(input, answers) {
                if (require('fs').existsSync(input)) {
                    return true;
                } else {
                    return 'This file doesn\'t exist';
                }
            }
        }
    ]).then(answers => {
        // conf.set('db.default', {path: answers.sshfilepath});
        conf.set('defaultpath', answers.sshfilepath);
        conf.set('installed', true);
        console.log(chalk.green('Nice! Now we can go!'));
        start();
    }); 
} else {
    start();
}
