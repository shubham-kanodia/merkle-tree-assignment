import { hashPair, sha256 } from "./utils.js";

export const computeMerkleRoot = (transactions) => {
    let currentMerkelRoot = sha256(transactions[0]);
    for (let idx=1; idx<transactions.length; idx++) {
        currentMerkelRoot = hashPair(currentMerkelRoot, sha256(transactions[idx]));
    }

    currentMerkelRoot = currentMerkelRoot.toString("hex");
    
    return currentMerkelRoot;
};

export const computeMerkleProof = (transactions, leafIndex) => {
    let currentMerkelRoot = sha256(transactions[0]);
    let proof = [];

    for (let idx=1; idx<transactions.length; idx++) {
        if (idx == leafIndex){
            proof.push({left: currentMerkelRoot.toString("hex")});
        }
        else if (idx > leafIndex) {
            proof.push({right: sha256(transactions[idx]).toString("hex")});
        }
        
        currentMerkelRoot = hashPair(currentMerkelRoot, sha256(transactions[idx]));
    }

    return proof;
};
