import {
  impersonateAccount,
  loadFixture,
  stopImpersonatingAccount,
} from "@nomicfoundation/hardhat-network-helpers";
import "@nomiclabs/hardhat-ethers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ConnectFour", function() {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    const ConnectFour = await ethers.getContractFactory("ConnectFour");
    const connectFour = await ConnectFour.deploy();

    await connectFour.deployed();

    return { connectFour };
  }

  describe("Deployment", function() {
    it("should have a default game state", async function() {
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

  describe("Game", function() {
    it("should be able to challenge an opponent", async function() {
      const { connectFour } = await loadFixture(deployFixture);
      const [user, opponent] = await ethers.getSigners();

      const opponentAddress = await opponent.getAddress();
      const userAddress = await user.getAddress();

      const gameId = await connectFour.callStatic.challenge(opponentAddress);
      const challengeTx = await connectFour.challenge(opponentAddress);
      await challengeTx.wait();

      const [player1, player2, moves, finished] = await connectFour.getGame(
        gameId
      );

      expect(player1).hexEqual(opponentAddress);
      expect(player2).hexEqual(userAddress);
      expect(moves).to.equal(0);
      expect(finished).to.equal(false);
    });

    it("should be able to make move", async function() {
      const { connectFour } = await loadFixture(deployFixture);
      const [, opponent] = await ethers.getSigners();
      const opponentAddress = await opponent.getAddress();

      const gameId = await connectFour.callStatic.challenge(opponentAddress);
      const challengeTx = await connectFour.challenge(opponentAddress);
      await challengeTx.wait();

      const makeMoveTx = await connectFour
        .connect(opponent)
        .makeMove(gameId, ethers.BigNumber.from("4"), {
          from: opponentAddress,
        });
      await makeMoveTx.wait();

      const [, , moves, finished] = await connectFour.getGame(gameId);
      const [board1, board2] = await connectFour.getBoards(gameId);

      const move4Board = "268435456";
      const emptyBoard = "0";
      expect(board1).to.equal(move4Board);
      expect(board2).to.equal(emptyBoard);
      expect(moves).to.equal(1);
      expect(finished).to.equal(false);
    });

    it("should be able to finish game", async function() {
      const { connectFour } = await loadFixture(deployFixture);
      const [user, opponent] = await ethers.getSigners();
      const [userAddress, opponentAddress] = await Promise.all([
        user.getAddress(),
        opponent.getAddress(),
      ]);

      const gameId = await connectFour.callStatic.challenge(opponentAddress);
      const challengeTx = await connectFour.challenge(opponentAddress);
      await challengeTx.wait();

      const moveList = ["4", "3", "4", "3", "4", "3", "4"];
      await Promise.all(
        moveList.map(async (move, i) => {
          const isOpponent = i % 2 === 0;
          const signer = isOpponent ? opponent : user;
          const from = isOpponent ? opponentAddress : userAddress;
          const makeMoveTx = await connectFour
            .connect(signer)
            .makeMove(gameId, ethers.BigNumber.from(move), { from });
          await makeMoveTx.wait();
        })
      );

      const [, , moves, finished] = await connectFour.getGame(gameId);

      expect(moves).to.equal(moveList.length);
      expect(finished).to.equal(true);
    });
  });

  describe("State", function() {
    const BOARD_SIZE = 49;
    it("should have a parseable board", async function() {
      const { connectFour } = await loadFixture(deployFixture);
      const [user, opponent] = await ethers.getSigners();
      const opponentAddress = await opponent.getAddress();

      const gameId = await connectFour.callStatic.challenge(opponentAddress);
      const challengeTx = await connectFour.challenge(opponentAddress);
      await challengeTx.wait();

      const columns = Array.from(Array(3).keys());
      const slotsInColumn = Array.from(Array(6).keys());
      for (const col of columns) {
        await Promise.all(
          slotsInColumn.map(async (i) => {
            const isOpponent = i % 2 === 0;
            const signer = isOpponent ? opponent : user;
            if (isOpponent) {
              impersonateAccount(opponentAddress);
            } else {
              stopImpersonatingAccount(opponentAddress);
            }
            // console.debug(`Player ${Number(!isOpponent) + 1} plays column ${col + 1}`)

            const makeMoveTx = await connectFour
              .connect(signer)
              .makeMove(gameId, ethers.BigNumber.from(col));
            await makeMoveTx.wait();
          })
        );
      }

      const [board1, board2] = await connectFour.getBoards(gameId);

      // const b1Bin = padTo(BOARD_SIZE, board1.toNumber().toString(2));
      // const b2Bin = padTo(BOARD_SIZE, board2.toNumber().toString(2));
      // const b1Art = bitboardToArt(b1Bin);
      // const b2Art = bitboardToArt(b2Bin);
      // console.debug("Board 1:", b1Bin);
      // console.debug(b1Art);
      // console.debug("Board 2:", b2Bin);
      // console.debug(b2Art);

      const [, , moves] = await connectFour.getGame(gameId);

      const board1State = "1010100101010010101";
      const board2State = "10101001010100101010";
      expect(board1.toNumber().toString(2)).to.equal(board1State);
      expect(board2.toNumber().toString(2)).to.equal(board2State);
      expect(moves).to.equal(columns.length * slotsInColumn.length);
    });
  });

  function bitboardToArt(value: string) {
    const bitsByColumn = toBitsByColumn(value);
    return Object.values(bitsByColumn)
      .map((column) => column.reverse())
      .flat()
      .map((char, i) => {
        const bit = Number(char);
        const isLastSlot = (i + 1) % 7 === 0;
        return bitToArt(bit).concat(isLastSlot ? "\n" : " | ");
      })
      .join("");
  }

  function bitToArt(value: number) {
    if (value) {
      return `X`;
    }
    return `0`;
  }

  function toBitsByColumn(bitboard: string) {
    return [...bitboard]
      .reverse()
      .reduce<{ [col: number]: string[] }>((acc, char, i) => {
        const cols = Object.keys(acc).length;
        const isFirstRow = (i + 1) % 7 === 1;
        const isLastRow = (i + 1) % 7 === 0;
        if (isFirstRow) {
          return {
            ...acc,
            [cols]: [char],
          };
        }
        if (isLastRow) {
          return acc;
        }
        return {
          ...acc,
          [cols - 1]: [...acc[cols - 1], char],
        };
      }, {});
  }

  function padTo(length: number, value: string) {
    const lengthToPad = length - value.length;
    return Array.from(Array(lengthToPad).keys()).fill(0).join("").concat(value);
  }
});
