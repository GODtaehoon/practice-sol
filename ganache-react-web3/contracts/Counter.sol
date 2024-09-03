// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Counter {
  uint256 public count;

  function current() public view returns(uint256) {
    return count;
  }

  function increment() public {
    count += 1;
  }
  function decrement() public {
    require(count > 0, "count > 0");
    count -= 1;
  }
}
