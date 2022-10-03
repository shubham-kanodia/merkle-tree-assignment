const csvtojson = require("csvtojson");
const MerkleTools = require("merkle-tools");
const SHA256 = require("crypto-js/sha256");

const filePath = "../../../data.csv";

const readCSV = async (filePath) => await csvtojson().fromFile(filePath);
const loadLines = async () => await readCSV(filePath);

const computeMerkleRoot = (transactions) => {
  const merkleTools = new MerkleTools({});
  merkleTools.addLeaves(transactions, true);
  merkleTools.makeTree(false);
  return merkleTools.getMerkleRoot().toString("hex");
};

const verifyMerkleProof = (transactions, proof, targetHash, merkleRoot) => {
  const merkleTools = new MerkleTools({});
  merkleTools.addLeaves(transactions, true);
  merkleTools.makeTree(false);
  return merkleTools.validateProof(proof, targetHash, merkleRoot);
};

test("test number of lines in csv", async () => {
  const lines = await loadLines();
  expect(lines.length).toBeGreaterThanOrEqual(10);
});

test("test merkle root for each line", async () => {
  const lines = await loadLines();
  for (const line of lines) {
    const txs = line.transactions.split(",");
    const merkleRoot = computeMerkleRoot(txs);
    expect(merkleRoot).toBe(line?.merkleRoot);
  }
});

test("test merkle proof for each line", async () => {
  const lines = await loadLines();
  for (const line of lines) {
    const txs = line?.transactions.split(",");
    const merkleRoot = computeMerkleRoot(txs);
    const middleLeafIndex = Math.floor(txs.length / 2);
    const middleLeafSHA256Hash = SHA256(txs[middleLeafIndex]).toString();
    const isValidMerkleProof = verifyMerkleProof(
      txs,
      JSON.parse(line?.middleLeafMerkleProof),
      middleLeafSHA256Hash,
      merkleRoot
    );
    expect(isValidMerkleProof).toBe(true);
  }
});
