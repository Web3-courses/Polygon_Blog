const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("first", function () {
  it("Should return the new greeting once it's changed", async function () {
    const first = await hre.ethers.getContractFactory("MiniBlog");// here MiniBlog is the contract name..not the file name
    const frst = await first.deploy("Hello, Hardhat!");
    await frst.deployed();
    console.log('frst deployed')

    //expect(await greeter.greet()).to.equal("Hello, world!");

    //const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    //await setGreetingTx.wait();

    //expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
