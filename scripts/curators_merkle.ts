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

curators_merkle();
