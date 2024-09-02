// SPDX-License-Identifier: GPL-MIT
pragma solidity ^0.8.26;

contract HelloWorld {
  string public value;

  constructor() {
    value = "hihihi";
  }

  function setValue(string memory _v) public {
    value = _v;
  }
}