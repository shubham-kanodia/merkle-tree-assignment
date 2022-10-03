import { computeMerkleRoot, computeMerkleProof } from "./tree_solved.js";
import { readCSV, writeJSON } from "./utils.js";

const calculateRootAndProof = (transactions) => {
  const txs = transactions.split(",");
  const middleLeafIndex = Math.floor(txs.length / 2);

  const merkleRoot = computeMerkleRoot(txs);
  const middleLeafMerkleProof = computeMerkleProof(txs, middleLeafIndex);

  return {
    transactions,
    merkleRoot,
    middleLeafMerkleProof,
  };
};

const main = async (filePath) => {
  const lines = await readCSV(filePath);
  const newLines = lines.map(({ transactions }) =>
    calculateRootAndProof(transactions)
  );
  writeJSON(newLines, filePath);
};

main("../data.csv");
