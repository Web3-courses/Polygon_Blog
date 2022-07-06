// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// the above is the version of solidity

// Start the contract object

contract MiniBlogV4{
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

    // we need to create a function to add a post
    // This function will take the title and content as parameters

    function createPost(string memory title, string memory content) public {
       latestPostId++;// increment when creating a post

       posts[latestPostId] = Post(title, content, msg.sender, block.timestamp);
       // posts is a mapping and we are storing the post struct in the mapping
       // the key is the post id and the value is the post struct
       // msg.sender is the address of the user who is posting
       // block.timestamp is the timestamp of the block when the post is created

       users[msg.sender].postIds.push(latestPostId);
       // users is a mapping and we are storing the user struct in the mapping
       // the key is the address of the user who is posting
       // the value is the user struct
       // users[msg.sender].postIds is the array of post ids of the user who is posting
       // latestPostId is the id of the post which is being created

   }

   // ****** Editing the posts ******
   // We need to create a function to edit the posts title
   // This function will take the post id and the new title as parameters

   function modifyPostTitle(uint256 postId, string memory title) public {
        require(msg.sender == posts[postId].author, "Only the author can modify");

        posts[postId].title = title;
    }

   // We need to create a function to edit the posts content
   // This function will take the post id and the new content as parameters

    function modifyPostContent(uint256 postId, string memory content) public {
        require(msg.sender == posts[postId].author, "Only the author can modify");

        posts[postId].content = content;
        } 

}