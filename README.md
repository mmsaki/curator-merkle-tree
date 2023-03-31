# Using merkle tree for data storage contracts

Will be using `merkletreejs` as that is what is commonly used

```zsh
npm init -y
```

Install dependencies:

```zsh
npm i merkletreejs crypto-js keccak256 @openzeppelin/contracts
```

or if you are cloning this project you can just do `npm i`

## Generating proofs for curator address of curation address

```ts
function curators_merkle() {
	const { MerkleTree } = require('merkletreejs');
	const keccak256 = require('keccak256');

	// using keccak256 for curator whitelist
	const curators = [
		'0xFE948CB2122FDD87bAf43dCe8aFa254B1242c199',
		'0x04655832bcb0a9a0bE8c5AB71E4D311464c97AF5',
	];
	const whitelistLeaves = curators.map((address) => keccak256(address));
	const merkleTree = new MerkleTree(whitelistLeaves, keccak256, {
		sortPairs: true,
	});
	const rootHash = merkleTree.getRoot().toString('hex');
	console.log(`Curators Merkle Root: 0x${rootHash}`);
	curators.forEach((address) => {
		const proof = merkleTree.getHexProof(keccak256(address));
		console.log(`Curator address: ${address} Proof: ${proof}`);
	});
	console.log(
		'When curator address is not in merkle tree returns null:',
		merkleTree.getHexProof(
			keccak256('0x04655832bcb0a9a0bE8c5AB71E4D311464c97AF6')
		)
	);
}
```

## `AddCuration` function

Your contract the add curation logic will take in a valid `proof` and a `leaf` which is has membership in the merkle tree.

## Generating merkle root for a list of Curators or Curation addresses

The best way would be to store your list of curation address or curators somewhere. Or if on chain, it can allow others to add to the list of curated addresses in a decentralized way.

Run:

```zsh
npm run curator
```

The script should return stdout:

```zsh
Curators Merkle Root: 0xb4a0d614127597fe036f57ffcff3c6c196a0b44597d2d6b28da736db161d8d9e
Curator address: 0xFE948CB2122FDD87bAf43dCe8aFa254B1242c199 Proof: 0xdc409871f5d5879967f6160c3700f45d4837bebd5eff88b50d3d6c9322a01925
Curator address: 0x04655832bcb0a9a0bE8c5AB71E4D311464c97AF5 Proof: 0xb6e945659512f0a2ee6c3a68f7e3a56835467a73f25bbd7b43db5c9f370bffa1
```

## Solidity contract to check membership in merkle tree

```js
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

pragma solidity ^0.8.0;

contract CurateArt {
  bytes32 public merkleRoot;

  constructor( bytes32 _merkleRoot) {
    merkleRoot = _merkleRoot;
  }

  function AddCuration(bytes32[] memory proof, address account) public view returns (bool) {
    bytes32 leaf = keccak256(abi.encodePacked(account));
    // invalid address / leafs that are not on the merkle tree will revert
    require(MerkleProof.verify(proof, merkleRoot, leaf), "Invalid curator proof or leaf");

    // user now has ability to add to curation, allowing them to add curation & other logic
    return true;
  }
}
```

## Example

```zsh
npm run example
```
