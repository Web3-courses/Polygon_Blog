// Imports
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ethers } from "ethers";
import React from 'react';
import { useState } from 'react';


// App function --> ES6 syntax
const App = () => {

  // State

  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');


  // Methods
  // Method to connect to the wallet
  // The method should be asynchronous for the user to be able to connect to the wallet
  const connectWallet = async () =>{
    if(window.ethereum){
      console.log("You have what you need ;)")
      // A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      // MetaMask requires requesting permission to connect users accounts
      await provider.send("eth_requestAccounts", []).then((res) =>{
        console.log(res)
        setAccount(res[0]);
        console.log("User has granted access to accounts")

      }).catch(() =>{
        console.log("User has denied access to accounts")
        }
        );

      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      const signer = provider.getSigner(0)

      console.log(signer);
    }
    else{
      console.log("No Ethereum browser detected");
    }
  }

  // Method to get the balances
  const showBalances = async () =>{
    
    // Get the provider
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // Get the signer
    const signer = provider.getSigner(0)

    // Get the address
    const address = signer.address

    // Get the balance
    const balance = await signer.getBalance()

    // Convert the balance to ether
    const etherBalance = ethers.utils.formatEther(balance)

    // Display the balance
    setBalance(etherBalance);

  }

  return (
    <div className="m-auto ">
      
      <p> Hello Node </p> 

      <button onClick={connectWallet} className="btn btn-primary">Connect Wallet</button><br/>
      <button onClick={showBalances} className="btn btn-primary mt-2">Show Balances</button>


      <p>Account  : {account}  </p><br/>
      <p>Balances : {balance}  </p>

    </div>
  );
}

export default App;
