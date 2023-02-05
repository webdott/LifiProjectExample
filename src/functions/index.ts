import { ethers } from "ethers";
const EthDater = require("ethereum-block-by-date");
const provider = new ethers.providers.CloudflareProvider();

const dater = new EthDater(provider);

export const getBlockNumber = async () => {
  let block = await dater.getDate(new Date(), true, false);
  return block.block;
};

export const formatDate = (startDate: number) => {
  let date = new Date(startDate),
    dataFormatter =
      [date.getMonth() + 1, date.getDate(), date.getFullYear()].join("/") +
      " " +
      [date.getHours(), date.getMinutes(), date.getSeconds()].join(":");

  return dataFormatter.split(" ")[1];
};

export const pickFeaturedGame = () => {
  return Math.floor(Math.random() * 10);
};
