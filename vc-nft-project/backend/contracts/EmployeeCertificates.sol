// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract EmployeeCertificates is ERC721URIStorage {
    uint256 public nextTokenId;
    address public owner;

    constructor() ERC721("EmployeeCertificates", "CERT") {
        owner = msg.sender;
    }

    // Issue certificate (NFT) to an employee
    function issueCertificate(address employee, string memory tokenURI) public {
        require(msg.sender == owner, "Only the owner can issue certificates");

        uint256 tokenId = nextTokenId;
        nextTokenId++;

        _mint(employee, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }
}
