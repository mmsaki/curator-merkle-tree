// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

pragma solidity ^0.8.0;

contract CurateArt {
  bytes32 public merkleRoot;

  constructor( bytes32 _merkleRoot) {
    merkleRoot = _merkleRoot;
  }

  function AddCuration(bytes32[] memory proof, address account) public view returns (bool) { 
    bytes32 leaf = keccak256(abi.encodePacked(account));
    // invalid address or leafs that are not on the merkle tree will revert
    require(MerkleProof.verify(proof, merkleRoot, leaf), "Invalid curator proof or leaf");
    
    // user now has ability to add to curation & perform other logic
    // TODO: Add logic

    return true;
  }

  function updateMerkle(bytes32 root) {
    merkleRoot = root;
  }
}