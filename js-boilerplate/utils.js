import fs from "fs";
import csvtojson from "csvtojson";
import { Parser } from "json2csv";
import crypto from "crypto";

export const readCSV = async (filePath) => await csvtojson().fromFile(filePath);

export const writeJSON = (json, filePath) => {
  const csv = new Parser().parse(json);
  fs.writeFileSync(filePath, csv);
};

export const sha256 = (tx) => crypto.createHash("sha256").update(tx).digest();

export const hashPair = (hashA, hashB, hashFunction = sha256) =>
  hashFunction(Buffer.concat([hashA, hashB]));
