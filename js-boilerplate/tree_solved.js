import MerkleTools from "merkle-tools";

export const computeMerkleRoot = (transactions) => {
  const merkleTools = new MerkleTools({});
  merkleTools.addLeaves(transactions, true);
  merkleTools.makeTree(false);
  return merkleTools.getMerkleRoot().toString("hex");
};

export const computeMerkleProof = (transactions, leafIndex) => {
  const merkleTools = new MerkleTools({});
  merkleTools.addLeaves(transactions, true);
  merkleTools.makeTree(false);
  return merkleTools.getProof(leafIndex);
};
