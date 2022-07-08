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
  const [ABI, setABI]           = useState('');
  const [address, setAddress]   = useState('');

  // Get the number of post ids
  const [numberOfPostIds, setNumberOfPostIds] = useState(['']);
  // Get the posts
  const [posts, setPosts] = useState([{title:'', content:''}]);


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

// Method for form to create a post
const createPostFormSubmitted = async (event) =>{
    
  event.preventDefault();
  const newPostTitle   = event.target.title.value;
  const newPostContent = event.target.content.value;

  // Get the provider
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  // Get the signer
  const signer = provider.getSigner(0)  
  // Get the contract
  const blogContract = new ethers.Contract(address, ABI, signer );

  // Create the post
  const post = await blogContract.createPost(newPostTitle, newPostContent);

  // Get the posts from the contract
  const latestID = await blogContract.latestPostId();
  //const latsetIDtoNumber = latestID.toNumber();
  const postDetails = await blogContract.getPostById(latestID);
  // save the post ids in the state
  setNumberOfPostIds(arr => [...arr,latestID]);
  // save the posts in the state
  setPosts(arr => [...arr,{title:postDetails.title, content:postDetails.content}]);
  // Clear the form
  event.target.title.value = '';
  event.target.content.value = '';

}

  return (
    <div className="m-auto" >

      <div className="container-fluid">
        <div className="row mt-2">
          <div className="col-md-12">
            <h1 className="text-center">Hello , Node</h1>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-6 text-center">
            <button onClick={connectWallet} className="btn btn-primary">Connect Wallet</button><br/>
          </div>

          <div className="col-md-6 text-center">
            <button onClick={showBalances} className="btn btn-primary mt-2">Show Balances</button>
          </div>
        </div> 

        <div className="row mt-2">
          <div className="col-md-6 text-center">
          <p> ACCOUNT  : {account}  </p>
          <p> ADDRESS  :  {address}  </p>
          </div>

          <div className="col-md-6 text-center">
          <p> Balances : {balance}  </p>
          </div>
        </div>  

      <hr/>  

      <div className="row mt-2">
        <div className="col-md-6">
              <form onSubmit={createPostFormSubmitted}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input type="text" className="form-control" id="title" placeholder="Title" />
                  <small id="titleHelp" className="form-text text-muted">Enter the title of the post</small>
                </div>
                <div className="form-group">
                   <label htmlFor="content">Content</label>
                   <textarea className="form-control" id="content" rows="3"></textarea>
                   <small id="contentHelp" className="form-text text-muted">Enter the content of the post</small>
                </div>
                <button type="submit" className="btn btn-primary">Create Post</button>
              </form>
          </div>
      </div>

      <hr/>


      <table className="table">
        <thead>
          <tr>
            <th>Index</th>
            <th>Title</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => {
            return (
              <tr key={index}>
                <td>{index}</td>
                <td>{post.title}</td>
                <td>{post.content}</td>
              </tr>
            )
          }
          )}
        </tbody>

      </table>

      

     </div>

    </div>
  );
}

export default App;
