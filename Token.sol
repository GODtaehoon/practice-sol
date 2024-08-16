// SPDX-License-Identifier: GPL-MIT
pragma solidity ^0.8.26;

contract MyFirstToken {
    string public name = "My First Contract";
    string public symbol = "MFT";
    uint public  decimals = 18;
    mapping (address owner => uint amount) public balances;

    event Transfer(address indexed from, address indexed to, uint256 amount);

    function balanceOf(address owner) public  view returns (uint amount) {
        return balances[owner];
    }

    function transfer(address to, uint amount) public returns (bool success) {
        address owner = msg.sender;
        require(balances[owner] >= amount);
        balances[owner] -= amount;
        balances[to] += amount;
        emit Transfer(owner, to, amount);
        return true;
    }
}