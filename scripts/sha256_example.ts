function main() {
	const { MerkleTree } = require('merkletreejs');
	const SHA256 = require('crypto-js/sha256');
	const keccak256 = require('keccak256');

	// Example using sha256
	const data = ['a', 'b', 'c', 'd'];
	const leaves = data.map((x) => SHA256(x));
	const tree = new MerkleTree(leaves, SHA256);
	const root = tree.getRoot().toString('hex');
	const leaf = SHA256('a');
	const proof = tree.getProof(leaf);
	console.log('Is valid tree', tree.verify(proof, leaf, root));
}

main();
