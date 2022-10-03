## Assignment

A Merkle tree is a hash-based data structure that is a generalization of the hash list. It is a tree structure in which each leaf node is a hash of a block of data, and each non-leaf node is a hash of its children. Merkle trees have a branching factor of 2, meaning that each node has up to 2 children. They trees are used in distributed systems for efficient data verification. They are a key part of blockchains like Bitcoin and Ethereum.

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Hash_Tree.svg/1920px-Hash_Tree.svg.png" alt="Merkle Tree Diagram" width="60%"/>

In this assignment, you will create two core functions of merkle trees to gain an understanding of how they work:

#### computeMerkleRoot

For a given list of transactions, compute the merkle root for them.

#### computeMerkleProof

For a given list of transactions and leaf index, compute the merkle proof for the leaf. Refer to the **middleLeadMerkleProof** column of the first three rows of [data.csv](data.csv) for the output format.

### Instructions

1. Read data.csv
1. For each row
   1. Read the transactions column
   1. Compute the merkle root and the merkle proof columns. Use the SHA256 hash for hashing transactions.
   1. Update the columns
1. Save the updated file

We have provided [boilerplate code in JavaScript](js-boilerplate/index.js). You will only need to finish the implementations of the two functions in [tree.js](js-boilerplate/tree.js) to generate the final result. You are free to use any language to attempt this assignment. You can use any-third party library for computing the root and the proof but we recommend writing the algorithm by hand to get a good understanding. We will test the results in [data.csv](data.csv).
