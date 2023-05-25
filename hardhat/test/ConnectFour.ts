import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import "@nomiclabs/hardhat-ethers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ConnectFour", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    const ConnectFour = await ethers.getContractFactory("ConnectFour");
    const connectFour = await ConnectFour.deploy();

    await connectFour.deployed();

    return { connectFour };
  }

  describe("Deployment", function () {
    it("should have a default game state", async function () {
      const { connectFour } = await loadFixture(deployFixture);
      const [player1, player2, moves, finished] = await connectFour.getGame(
        "0"
      );

      expect(player1).hexEqual("0x0");
      expect(player2).hexEqual("0x0");
      expect(moves).to.equal(0);
      expect(finished).to.equal(false);
    });
  });
});
