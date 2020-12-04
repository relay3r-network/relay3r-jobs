## Relay3r Jobs

This repo contains everything you need to run be a Relayer.

## Available Jobs

### [Relayer](https://relay3r.network)

- CoreFlashArbRelayer
- GetBackETHRelayer
- UnitradeRelayer
- BACFarmerRelayer
- RelayerV1Oracle

### [Keep3r](https://keep3r.network/)

- CrvStrategyKeep3r
- DForceStrategyKeep3r
- HegicPoolKeeper
- Keep3rV1Oracle
- YearnV1Keeper
- MMStrategyKeeperV1

## Getting started

### With Docker

You will need to have Docker and Docker-Compose installed. Refer to [the Docker installation guide](https://docs.docker.com/engine/install/).
If you are running the relayer on a Linux server, you will have to install docker-compose separately. Refer to [docker-compose installation guide](https://docs.docker.com/engine/install/)

#### Steps to launch your relayer

- Rename the file env.example to .env

Default .env:
```
MNEMONIC=
INFURA_PROJECT_ID=
JOBS=RelayerV1Oracle,UnitradeRelayer
```
- If you want to use an existing wallet set your MNEMONIC in the .env
- Get an Infura Project Id from [Infura](https://infura.io/dashboard) and set it to INFURA_PROJECT_ID key
- Set the jobs you want to work on in the .env, concat the names with comma. Refer to the "Available Jobs" section for the names.
- Run `docker-compose up -d` to start the container in the background.
- If you did not supply a wallet, one will be created automatically. The mnemonic will be set in the .env file. Make sure to note it in case you loose the file. You will be able to see the address by looking at the log files with `docker-compose logs`

Your container is set to restart everytime if it crashes or when Docker is launching. If you want to disable this behavior change `restart: always` to `restart: "no"` in the `docker-compose.yml` file.

### Without Docker

- First create a wallet by running `node createwallet`,this will give you the mnemonic,privatekey and public address of the newly created wallet.
- Rename the file env.example to .env
- Configure the .env file with the previously generated mnemonic and Infura Project Id from [Infura](https://infura.io/dashboard).
- Set the jobs you want to work on in the .env, concat the names with comma.
- open a tmux session with `tmux`
- execute `npm start`.
- detach from tmux and let the script run in the background.
