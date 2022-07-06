### INSTRUCTIONS

This repo contains a blog site built using Polygon matic and react js. 
The dapp allows users to visualize their name, biography and the feed of all the posts. The user can also publish posts.

## Create folders

Create two folders --> client and smart contract

Smart contracts contains all the details about smart contract and migration files for that

Client contains the frotend part which will interact with smart contracts


#### Smart contracts folder

1. npm init 
2. npm install
3. npm install --save-dev hardhat
4. npm install --save-dev @nomiclabs/hardhat-ethers 'ethers@^5.0.0'
5. npm install --save-dev @nomiclabs/buidler
6. npm install --save-dev @nomiclabs/hardhat-waffle 'ethereum-waffle@^3.0.0'
7. npm install --save-dev chai

or you can use single line of code

npm install --save-dev hardhat @nomiclabs/hardhat-ethers 'ethers@^5.0.0' @nomiclabs/buidler @nomiclabs/hardhat-waffle 'ethereum-waffle@^3.0.0' chai

** some times you may need to add --force for installing the dependencies **

The most important step here is to create a hardhat project. to do that do npx hardhat
