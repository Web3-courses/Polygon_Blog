// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// the above is the version of solidity

// Start the contract object

contract MiniBlogV2{
    // Global variables
    // Add latestPostId Here which is something like counter for getting the total posts posted
    uint256 public latestPostId = 0;

    // Structs
     // Create two structs --> User and Post
     // User struct contains the details of the username, bio and ids of posts
     // Post struct contains the details of the post title, body and id of the user
       struct User {
       string username;
       string bio;
       uint256[] postIds;
   }

   struct Post {
       string title;
       string content;
       address author;
       uint256 created;
   }

    // Mappings
    // Create two mappings --> users and posts
    // The reason for using mappings is to store the data in the form of key value pairs
    // The key is the username and the value is the user struct
    // The key is the post id and the value is the post struct
    mapping (address => User) public users;
    mapping (uint256 => Post) public posts;

    // Events

    // Functions

    
}