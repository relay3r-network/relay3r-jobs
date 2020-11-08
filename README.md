## Relay3r Jobs

This repo contains a collection of nodejs scripts to make setup of a keeper easier and simpler

## Getting started

- First create a wallet by running `node createwallet`,this will give you the mnemonic,privatekey and public address of the newly created wallet.
- Modify the wallet config in config/wallet.js with the new mnemonic.
- Get the infura project id from dashboard,paste it in the `config/provider.js` file.
- Choose a job from the jobs folder.
- open a tmux session with `tmux`
- execute `node job.js` where the job is the job you want to work on for example `node hegickeeper.js`.
- detach from tmux and let the script run in the background.
