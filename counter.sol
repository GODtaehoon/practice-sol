// SPDX-License-Identifier: GPL-MIT
pragma solidity ^0.8.26;

import "./ownable.sol";

contract Counter is Ownable{
    uint private value = 0;

    event Reset(address owner, uint currentValue);

    function reset() public onlyOwner{
        emit Reset(msg.sender, value);
        value = 0;
    }
    
    function getValue() public view returns (uint){
        return value;
    }

    function increment() public payable {
        require(msg.value == 1 wei, "1 Wei");
        value = value + 1;
    }

    function withdraw() public onlyOwner{
        payable (owner).transfer(address(this).balance);
    }
}