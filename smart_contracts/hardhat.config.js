require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// alchemy api: https://polygon-mumbai.g.alchemy.com/v2/CXnXnnCKVe1K2p9UUDxkEY7tUjeNusWe
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks:{
    mumbai :{
      url: "https://polygon-mumbai.g.alchemy.com/v2/CXnXnnCKVe1K2p9UUDxkEY7tUjeNusWe",
      accounts: ['b1e28aefd255c6c157ffe7c45a71ce1c2d0477d76e94466242ed2c1bbcc4fc20'] // change this to your private key

    }
  }
};
