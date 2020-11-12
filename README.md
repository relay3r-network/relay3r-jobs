## Relay3r Jobs

This repo contains a collection of nodejs scripts to make setup of a keeper easier and simpler

## Getting started

### With Docker

- Rename the file env.example to .env

Default .env:
```
MNEMONIC=
INFURA_PROJECT_ID=
```
- IF you want to use an existing wallet set your MNEMONIC
- Get an Infura Project Id from [Infura](https://infura.io/dashboard) and set it to INFURA_PROJECT_ID key
- Run docker-compose up. Note your mnemonic phrase and private key. Make sure no errors are printed to the console.
- Close the container with Ctrl+C and relaunch it with docker-compose start


By default all jobs are running. If you want to disable some jobs you have to comment their require in src/index.js.

### Without Docker

- First create a wallet by running `node createwallet`,this will give you the mnemonic,privatekey and public address of the newly created wallet.
- Rename the file env.example to .env
- Configure the .env file with the previously generated mnemonic and Infura Project Id from [Infura](https://infura.io/dashboard).
- open a tmux session with `tmux`
- execute `node job.js` where the job is the job you want to work on for example `node hegickeeper.js`.
- detach from tmux and let the script run in the background.
