# Akmey client

Akmey is a keyserver, but not GPG keys, for SSH ones! This client is made to easily add, remove, update user's keys.

Install it using `npm i -g akmey` or run it `npx akmey`.

Only 3 commands to remember :
- `akmey i username` : Add a user
- `akmey r username` : Remove a user
- `akmey u username` : Update a user; refetch new keys

_Note: this client is WIP and may not work in some situations. Bug reports are appreciated._