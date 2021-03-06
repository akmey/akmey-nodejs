#!/usr/bin/env node
/*
Akmey client
Licensed under GPLv3
(c) 2019 - Akmey contributors
*/

// const akmey = require('./api');
const axios = require('axios');
const program = require('commander');
const ora = require('ora');
const spinner = ora('Hello, loading Akmey client').start();
const configstore = require('configstore');
const conf = new configstore('akmey-client-js');
const path = require('path');
const fs = require('fs');
const md5 = require('md5');
const chalk = require('chalk');

class AkmeyFile {
    constructor(filepath, filecontent) {
        this.re = /(#-- Akmey\.js START Nonce:([A-Za-z0-9]+) --\n)((?:.|\n)+)(\n#-- Akmey\.js STOP --)/;
        this.path = filepath;
        this.content = filecontent;
        this.keybuffer = [];
        this.removebuffer = [];
        var result = this.re.exec(this.content.toString());
        if (result === null) {
            var str = filecontent.toString();
            str += '\n#-- Akmey.js START Nonce:' + md5(this.path) + ' --\n\n\n#-- Akmey.js STOP --\n';
            // console.log(str);
            fs.writeFileSync(this.path, str);
            this.content = str;
            this.akmeycontent = this.re.exec(this.content.toString());
        } else {
            this.akmeycontent = result;
        }
        this.nonce = this.akmeycontent[2];
        this.keys = this.akmeycontent[3];
        if (conf.get('db.'+this.nonce) === undefined) {
            conf.set('db.'+this.nonce, {checksum: md5(this.content), users: []});
        }
        this.db = conf.get('db.'+this.nonce);
    }

    /**
     * Add user's keys, need to call save() to apply changes
     * @param {akmey.FullUser} key 
     */
    addKeys(user, keyfilter = undefined, silent = false) {
        if (!silent) var load = ora('Adding key(s)').start();
        if (!this.db.users) {
            this.db.users = [user]
        } else {
            if (this.db.users.find(el => el.id == user.id)) {
                if (load) load.fail('This user is already installed, update it or remove it.');
                return false;
            } else {
                if (keyfilter) {
                    if (user.keys.find(el => el.comment == keyfilter)) {
                        if (load) load.text = 'Adding key ' + keyfilter;
                        this.keybuffer.push(user.keys.find(el => el.comment == keyfilter));
                    } else {
                        if (load) load.fail("The key (-k) does not exist");
                        return false;
                    }
                    user.keys = user.keys.filter(el => el.comment == keyfilter);
                    this.db.users.push(user);
                } else {
                    user.keys.forEach(key => {
                        this.keybuffer.push(key);
                    });
                    this.db.users.push(user);
                }
            }
        }
        if (load) load.succeed();
        return true;
    }

    /**
     * Remove user's keys, need to call save() to apply changes
     * @param {akmey.FullUser} key 
     */
    removeKeys(user, silent = false) {
        if (!silent) var load = ora('Removing keys').start();
        if (!this.db.users) {
            if (load) load.fail('This file does not contain any keys.');
            return false;
        } else {
            user = this.db.users.find(el => el.id == user.id) // Sync the entry to avoid residues
            if (this.db.users.find(el => el.id == user.id)) {
                this.db.users = this.db.users.filter(el => el.id != user.id);
            } else {
                if (load) load.fail('This user is not installed here.');
                return false;
            }
            user.keys.forEach(key => {
                this.removebuffer.push(key);
            });
            if (load) load.succeed();
        }
        return true;
    }

    addTeam(team, silent = false) {
        if (!silent) var load = ora('Adding member\'s keys').start();
        // Save team to database
        if (!this.db.teams) this.db.teams = [];
        if (this.db.teams.find(el => el.id == team.id)) {
            if (load) load.fail('This team is already installed');
            return false;
        } else {
            this.db.teams.push(team);
            if (load) load.succeed();
            return true;
        }
        
    }

    removeTeam(team, silent = false) {
        if (!silent) var load = ora('Removing member\'s keys').start();
        // Remove teams from databse
        if (!this.db.teams) this.db.teams = [];
        if (this.db.teams.find(el => el.id == team.id)) {
            this.db.teams = this.db.teams.filter(el => el.id != team.id);
            if (load) load.succeed();
            return true;
        } else {
            if (load) load.fail('This team is already installed');
            return false;
        }
        
    }

    save() {
        this.keybuffer.forEach(key => {
            this.keys += key.key + ' ' + key.comment + '\n';
        });
        this.removebuffer.forEach(key => {
            this.keys = this.keys.replace(key.key + ' ' + key.comment + '\n', '');
        });
        this.db.checksum = md5(this.content.toString()); // The checksum will be useful for future releases (warn user about file changes, or corruption)
        conf.set('db.'+this.nonce, this.db); // Sync the database (COMMIT; equivalent in MYSQL)
        var write = this.content.toString().replace(this.akmeycontent[0], this.akmeycontent[1] + this.keys + this.akmeycontent[4]);
        fs.writeFileSync(this.path, write);
        // console.log(this.keys);
        return true;
    }
}

function start() {
    var db = new AkmeyFile(conf.get('defaultpath'), fs.readFileSync(conf.get('defaultpath')));
    var api = axios.create({
        baseURL: 'https://akmey.leonekmi.fr/api/'
    });

    function setPath(param) {
        if (fs.existsSync(param)) {
            // Now we parse the nonce
            fullpath = path.resolve(param); // Resolve the full path
            filecontent = fs.readFileSync(fullpath);
            db = new AkmeyFile(fullpath, filecontent);
            return true;
        } else {
            spinner.fail('The target file (-t ' + param + ') does not exist');
            process.exit(1);
            return false;
        }
    }

    function setHttpServer(param) {
        api.defaults.baseURL = 'http://' + param + '/api/';
        return true;
    }

    function setServer(param) {
        api.defaults.baseURL = 'https://' + param + '/api/';
        return true;
    }

    function install(cmd, options) {
        spinner.succeed();
        var getspin = ora('Searching for user ' + cmd).start();
        api.get('user/match/'+cmd).then(data => {
            getspin.succeed();
            // console.log(data.keys);
            db.addKeys(data.data, options.key);
            db.save();
            conf.set('usercache.'+data.data.name, data.data);
        }, error => {
            getspin.fail('Cannot find user ' + cmd);
        });
    }

    function teaminstall(cmd) {
        spinner.succeed();
        var getspin = ora('Searching for team ' + cmd).start();
        api.get('team/match/'+cmd).then(data => {
            getspin.succeed();
            // console.log(data.keys);
            data.data.users.forEach(user => {
                db.addKeys(user, null, true);
                conf.set('usercache.'+user.name, user);
            });
            db.addTeam(data.data);
            db.save();
        }, error => {
            getspin.fail('Cannot find team ' + cmd);
        });
    }

    function teamremove(cmd) {
        spinner.succeed();
        var getspin = ora('Searching team ' + cmd).start();
        var team = db.db.teams.find(el => el.name == cmd);
        if (team) {
            getspin.succeed();
            team.users.forEach(user => {
                db.removeKeys(user, true);
            });
            db.removeTeam(team);
            db.save();
        } else {
            getspin.fail('This team is not installed');
        }
    }

    function remove(cmd) {
        spinner.succeed();
        var getspin = ora('Searching user ' + cmd).start();
        var user = db.db.users.find(el => el.name == cmd);
        if (user) {
            getspin.succeed();
            db.removeKeys(user);
            db.save();
        } else {
            getspin.fail('This user is not installed');
        }
    }

    function update(cmd, silent = false) {
        silent = (typeof silent == "boolean" && silent);
        if (!silent) spinner.succeed();
        if (cmd) {
            var getspin = ora('Updating user ' + cmd).start();
            api.get('user/match/'+cmd).then(data => {
                var user = db.db.users.find(el => el.id == data.data.id);
                if (user) {
                    getspin.succeed();
                    db.removeKeys(user, true);
                    db.addKeys(data.data, undefined, true);
                } else {
                    getspin.warn('This user is not installed; installing instead');
                    console.log(chalk.yellow('If you want to see installed users, please do `ls` command'));
                    db.addKeys(data.data, undefined);
                }
                db.save();
                conf.set('usercache.'+data.name, data);
                return true;
            }, _error => {
                getspin.fail('Cannot find user ' + cmd);
                return false;
            });
        } else {
            db.db.users.forEach(el => {
                update(el.name, true);
            });
            return true;
        }
    }

    function list() {
        spinner.succeed();
        console.log(chalk.green.underline('Akmey installed keys in ' + db.path));
        db.db.users.forEach(user => {
            console.log(chalk.yellow.bold(' - ' + user.name));
            user.keys.forEach(key => {
                console.log(chalk.yellow('   - ' + key.comment) + chalk.red(' (' + key.key.substr(0, 25) + '...)'));
            });
        });
        return true;
    }

    function reset() {
        spinner.succeed();
        var resetspin = ora('Resetting file').start();
        db.db.users.forEach(user => {
            db.removeKeys(user, true);
            db.save();   
        });
        resetspin.succeed();
    }

    function reconfig() {
        spinner.succeed();
        const inquirer = require('inquirer');
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
            conf.set('defaultpath', path.resolve(answers.sshfilepath));
            conf.set('installed', true);
            console.log(chalk.green('Akmey was successfully reconfigured!'));
        });
    }

    program.version('0.3.1-beta')
        .description('Akmey client can retreive keys from Akmey server and help you to manage it here.')
        .option('-t, --target <path>', 'Target file, where to add or remove keys', setPath)
        .option('--insecure-server <server>', 'Override https enforcement and use http server', setHttpServer)
        .option('-s, --server <server>', 'Use a custom server (must be https, see --insecure-server)', setServer);

    program.command('install <user>')
        .alias('i')
        .description('Add user\'s keys.')
        .option('-k, --key [keyname]', 'Add a specific key only')
        .action(install);

    program.command('teaminstall <team>')
        .alias('ti')
        .description('Add team\'s keys')
        .action(teaminstall);

    program.command('teamremove <team>')
        .alias('tr')
        .description('Remove team\'s keys')
        .action(teamremove);

    program.command('remove <user>')
        .alias('r')
        .description('Remove user\'s keys.')
        .action(remove);

    program.command('update [user]')
        .alias('u')
        .description('Update all or specific user by adding the new keys.')
        .action(update);

    program.command('list')
        .alias('ls')
        .description('List all the installed keys')
        .action(list);

    program.command('config')
        .alias('cfg')
        .description('Resetup Akmey')
        .action(reconfig);

    program.command('reset')
        .alias('rst')
        .description('Delete ALL keys from Akmey on your file')
        .action(reset);

    program.command('*')
        .action(function(_env) {
            spinner.fail('Unknown command');
            program.help();
        });

    program.parse(process.argv);

    if (!program.args.length) {
        spinner.warn('Please supply a command.');
        program.help();
    }
}

if (!conf.has('installed')) {
    spinner.warn();
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
        conf.set('db', {});
        conf.set('defaultpath', path.resolve(answers.sshfilepath));
        conf.set('installed', true);
        console.log(chalk.green('Nice! Now we can go!'));
        start();
    }); 
} else {
    start();
}
