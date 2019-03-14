# Akmey client

Akmey is a keyserver, but not GPG keys, for SSH ones! This client is made to easily add, remove, update user's keys.

Install it using `npm i -g akmey` or run it `npx akmey`.

## Commands
- `akmey i username` : Add a user
- `akmey r username` : Remove a user
- `akmey u [username]` : Update a user (all installed users if you don't supply user); refetch new keys
- `akmey ls` : List installed keys
- `akmey reset` : Reset the file, delete all the Akmey keys
- `akmey cfg` : Reconfigure Akmey

## Options
- `-t target_file` : Target file, where to add or remove keys
- `-s` : Use a custom Akmey server (https only, use `--insecure-server` for http)

_Note: this client is WIP and may not work in some situations. Bug reports are appreciated._