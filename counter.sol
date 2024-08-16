// SPDX-License-Identifier: GPL-MIT
pragma solidity ^0.8.26;

contract Counter {
    uint private value = 0;
    address public  owner;

    constructor() {
        owner = msg.sender;
    }

    function reset() public {
        require(msg.sender == owner);
        value = 0;
    }
    
    function getValue() public view returns (uint){
        return value;
    }

    function increment() public payable {
        require(msg.value == 1 wei, "1 Wei");
        value = value + 1;
    }

    function withdraw() public {
        require(msg.sender == owner);
        payable (owner).transfer(address(this).balance);
    }
}