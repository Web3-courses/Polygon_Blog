// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// the above is the version of solidity

// Start the contract object

contract MiniBlog{
    // Global variables

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

    // Events

    // Functions
}