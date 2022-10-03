import fs from "fs";
import csvtojson from "csvtojson";
import { Parser } from "json2csv";

export const readCSV = async (filePath) => await csvtojson().fromFile(filePath);

export const writeJSON = (json, filePath) => {
  const csv = new Parser().parse(json);
  fs.writeFileSync(filePath, csv);
};
