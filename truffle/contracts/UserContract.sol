// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
pragma abicoder v2;

contract UserContract {
    struct user {
        string Name;
        uint256 Age;
    }
    mapping(uint256 => user) public users;

    function storeUser(
        uint256 no,
        string memory _name,
        uint256 _age
    ) public {
        users[no] = user(_name, _age);
    }
}
