## Assignment

### Introduction

A Merkle tree is a **hash-based data structure** that is a generalization of the hash list. It is a tree structure in which **each leaf node is a hash of a block of data**, and **each non-leaf node is a hash of its children**. Merkle trees have a branching factor of 2, meaning that **each node has up to 2 children**. They are used in distributed systems for **efficient data verification**. They are a key part of blockchains like **Bitcoin** and **Ethereum**.

<img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Hash_Tree.svg/1920px-Hash_Tree.svg.png"  alt="Merkle Tree Diagram"  width="60%"/>

---

In this assignment, you have to write some code to generate the merkle root and merkle proof for a given list of transactions.

### Steps to compute the merkle proof:

1.  Hash all the transactions (like L1, L2, L3, L4 in the above diagram) using a hashing algorithm. For this assignment, we will be using the **SHA256** hash.
1.  These hashes are grouped into pairs. The hash is computed for each pair and this is stored in the parent node. Now the parent nodes are grouped into pairs and their hash is stored one level up in the tree. This continues till the root of the tree.
1.  In case of odd number of transactions, lonely transaction hashes are promoted to the next level up, as depicted in the diagram below (where A, B, C, D, E are the hashes of transactions):

                         ROOT=Hash(H+E)
                         /        \
                        /          \
                 H=Hash(F+G)        E
                 /       \           \
                /         \           \
         F=Hash(A+B)    G=Hash(C+D)    E
          /     \        /     \        \
         /       \      /       \        \
        A         B    C         D        E

1.  **Note:** You might find different implementations of Merkle trees on the web. For the purpose of this assignment, we are following the standard which libraries such as [merkle-lib](https://github.com/bitcoinjs/merkle-lib) (from bitcoinjs), [merkle-tools](https://github.com/Tierion/merkle-tools), [merkletreejs](https://github.com/miguelmota/merkletreejs), [pymerkletools](https://github.com/Tierion/pymerkletools), and [merkleib](https://github.com/vpaliy/merklelib) use.

    **So, internally, the leaves will be stored as Buffers. The tree is generated by hashing together the Buffer values.**

### Steps to compute the merkle proof for a leaf:

1. Suppose for the first diagram, a miner wanted to prove that the transaction `L1` belonged to the Merkle proof.
1. In order to do that, the miner needs to present the transaction with **all the nodes which lie on the path between the transaction and the root**.
1. If there are n nodes in the tree then only log(n) nodes need to be examined.
1. Hence even if there are a large number of nodes in the Merkle tree, proof of membership can be computed in a relatively short time.

**The list of all the nodes which lie on the path between the transaction and the root is the merkle proof.**

---

These examples will illustrate how you can compute the merkle root and merkle proof for a given list of transactions and leaf index:

### Example 1

**transactions:** `a`

**merkleRoot:** `ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb`

Explanation: Above merkleRoot is the SHA256 hash of **a**

**javascript code** for sha256 (from [js-boilerplate/utils.js](js-boilerplate/utils.js))

```javascript
crypto.createHash("sha256").update(tx).digest().toString("hex");
```

**merkleProof for the middle leaf:** `[]`

Explanation: In this case, the middle leaf is at index `0`. As this is the only leaf in the tree, we don't need any other object to compute the merkle root and hence the output is an empty array.

### Example 2

**transactions:** `a,b` i.e. `["a", "b"]`

**merkleRoot:** `e5a01fee14e0ed5c48714f22180f25ad8365b53f9779f79dc4a3d7e93963f94a`

Explanation: Above merkleRoot is obtained by hashing the hashes of the two transactions a and b.

**javascript code** for hasing a pair (from [js-boilerplate/utils.js](js-boilerplate/utils.js))

```javascript
const sha256 = (tx) => crypto.createHash("sha256").update(tx).digest();
const hashPair = (hashA, hashB, hashFunction = sha256) =>
  hashFunction(Buffer.concat([hashA, hashB]));

const a = sha256("a");
const b = sha256("b");
hashPair(a, b).toString("hex");
```

**merkleProof for the middle leaf:**

```json
[{ "left": "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb" }]
```

Explanation: In this case, the middle leaf is at index `1`. To generate the merkle proof, we need to provide the **hash of the transaction a** so that the pair of hashes can be used to compute and verify the merkle proof. The "left" key indicates that the transaction `a` occcured before transaction `b` and hence the hash should be calculated as `hashPair(a + b)` and not `hashPair(b + a)`.

## Instructions

1. Read [data.csv](data.csv)

   **Some sample test cases and the output format is present in the first three rows.**

1. For each row

   1. Read the transactions column

   1. Compute the value for the merkle root and the merkle proof (of the middle leaf) columns. Use the **SHA256** hash for hashing transactions.

      **Note:** The merkle proof array will contain a set of merkle sibling objects. Each object contains the sibling hash, with the key value of either right or left. The right or left value tells you where that sibling was in relation to the current hash being evaluated.

   1. Update the columns

   1. Save the updated file

1. Our automated tests will test you if the roots and proofs you provided are correct or not

You are free to use any language to attempt this assignment.

If you are comfortable with javascript, you can use our boilerplate code](js-boilerplate/index.js). You will only need to finish the implementations of the two functions in [tree.js](js-boilerplate/tree.js) to generate the final result.

#### References

- [Blockchain Merkle Trees](https://www.geeksforgeeks.org/blockchain-merkle-trees/)
- [merklelib](https://github.com/vpaliy/merklelib)
- [merkle-tools](https://github.com/Tierion/merkle-tools)
