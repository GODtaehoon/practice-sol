// SPDX-License-Identifier: GPL-MIT
pragma solidity ^0.8.26;

contract Ownable {
    address public  owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only Owner!");
        _;
    }
}