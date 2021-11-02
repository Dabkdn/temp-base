# Cardano Metadata & Transaction builder
===========================

## Requirements

- NodeJS > 12.x
- NPM > 6.x
- Cardano Node 1.27.0
- Cardano Cli 1.27.0
- IPFS

## Documentation

### Local Environment (both Mainnet and Testnet)
- First check all versions of packages in the requirements section

- Copy `.env.example` to `.env`.
- Edit your .env file variable with (you may need to get the latest `cardano config files` from cardano)
    - Mainnet wallet:
        `CARDANO_NETWORK="mainnet"` and `SHELLY_CONFIG_PATH="/../../node-mainnet-config/mainnet-shelley-genesis.json"`
    - Testnet wallet:
        `CARDANO_NETWORK="testnet-magic 1097911063"` and `SHELLY_CONFIG_PATH="/../../node-config/testnet-shelley-genesis.json"`
    - IPFS Daemon:
       connect to your IPFS Daemon ex: `IPFS_DAEMON=http://127.0.0.1:5002`
- Run `npm install` or `yarn install` (recommend) to install packages.

- Run `npm run dev` or `yarn dev` (recommend) to run your application.

- Go to your browser and enter address `http://localhost:8080/documentation` (The 8080 is default PORT in env file) to see your API website on Swagger layout

### Available scripts ?

- `dev`: Starts node in dev environment
- `test`: Runs tests using nyc, and creates coverage report.
