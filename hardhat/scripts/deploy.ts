import { ethers } from "hardhat";

async function main() {
  const ConnectFour = await ethers.getContractFactory("ConnectFour");
  const connectFour = await ConnectFour.deploy();

  await connectFour.deployed();

  console.log(
    `ConnectFour deployed to ${connectFour.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
