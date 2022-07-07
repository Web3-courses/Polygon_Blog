// Imports
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ethers } from "ethers";
import React from 'react';
import { useState } from 'react';

// Import the abis of the contract
// The abis are the functions and variables of the contract
// The abis are in JSON format
import abi from './utils/contractABI/blogContractABIFinal.json';

// Import the contract address
// The address is the address of the contract
import contractAddressList from './utils/constants/blog_constants';


// App function --> ES6 syntax
const App = () => {

  // State

  const [account, setAccount]   = useState('');
  const [balance, setBalance]   = useState('');
  const [ABI, setABI] = useState('');
  const [address, setAddress]   = useState('');

  // Get the number of post ids
  const [numberOfPostIds, setNumberOfPostIds] = useState(['']);


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
        setAccount(res[0]);
        setABI(abi.abi);
        setAddress(contractAddressList[0]);
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

  // Method to create the post
  const createPost = async (title, content) =>{

    console.log(title);
    console.log(content);

    // Get the provider
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // Get the signer

    const signer = provider.getSigner(0)
    

    // Get the contract
    const blogContract = new ethers.Contract(address, ABI, signer );

    console.log(blogContract);

    // Create the post
    const post = await blogContract.createPost(title, content);

    // Display the postid
    const latestID = await blogContract.latestPostId();
    
    // save the posts in the state
    setNumberOfPostIds(arr => [...arr,latestID]);

    console.log(numberOfPostIds);




  }

  return (
    <div className="m-auto ">
      
      <p> Hello Node </p> 

      <button onClick={connectWallet} className="btn btn-primary">Connect Wallet</button><br/>
      <button onClick={showBalances} className="btn btn-primary mt-2">Show Balances</button>


      <p>Account  : {account}  </p><br/>
      <p>Balances : {balance}  </p><br/>
      
      <p>address  : {address}  </p>

      <button onClick={() => createPost('hai','hello')} className="ml-5 btn btn-warning">click</button>

      

    </div>
  );
}

export default App;
