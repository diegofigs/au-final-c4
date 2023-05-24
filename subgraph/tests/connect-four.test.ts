import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
  createMockedFunction,
} from "matchstick-as/assembly/index";
import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import {
  handleGameProposed,
  handleGameWon,
  handleMovePerformed
} from "../src/connect-four";
import {
  createGameProposedEvent,
  createGameWonEvent,
  createMovePerformedEvent
} from "./connect-four-utils";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

// 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
let address = "0xa16081f360e3847006db660bae1c6d1b2e17ec2a";
let firstLogIndex = "01000000";
let id = address + firstLogIndex;
let user = "0x0000000000000000000000000000000000000001";
let opponent = "0x0000000000000000000000000000000000000002";
let gameId = "1";
let contractAddress = Address.fromString(address);
let boards: Array<ethereum.Value> = [
  ethereum.Value.fromUnsignedBigInt(BigInt.fromString("0")),
  ethereum.Value.fromUnsignedBigInt(BigInt.fromString("0"))
];
let boardsAfterMove: Array<ethereum.Value> = [
  ethereum.Value.fromUnsignedBigInt(BigInt.fromString("1")),
  ethereum.Value.fromUnsignedBigInt(BigInt.fromString("1"))
];
createMockedFunction(
  contractAddress,
  "getBoards",
  "getBoards(uint256):(uint64,uint64)"
)
  .withArgs([ethereum.Value.fromUnsignedBigInt(BigInt.fromString("1"))])
  .returns(boards);

describe("Events", () => {
  beforeAll(() => {
    let challenger = Address.fromString(user);
    let challenged = Address.fromString(opponent);
    let newGameProposedEvent = createGameProposedEvent(challenger, challenged);
    handleGameProposed(newGameProposedEvent);
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ProposalEvent created and stored", () => {
    assert.entityCount("ProposalEvent", 1);
    assert.fieldEquals("ProposalEvent", id, "challenger", user);
    assert.fieldEquals("ProposalEvent", id, "challenged", opponent);

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  });

  test("MoveEvent created and stored", () => {
    let challenged = Address.fromString(opponent);
    let row = 3;
    let movePerformedEvent = createMovePerformedEvent(
      challenged,
      BigInt.fromString(gameId),
      row
    );
    handleMovePerformed(movePerformedEvent);

    assert.entityCount("MoveEvent", 1);
    assert.fieldEquals("MoveEvent", id, "mover", opponent);
    assert.fieldEquals("MoveEvent", id, "gameId", gameId);
    assert.fieldEquals("MoveEvent", id, "row", row.toString());
  });

  test("WinEvent created and stored", () => {
    let challenged = Address.fromString(opponent);
    let gameWonEvent = createGameWonEvent(
      challenged,
      BigInt.fromString(gameId)
    );
    handleGameWon(gameWonEvent);

    assert.entityCount("WinEvent", 1);
    assert.fieldEquals("WinEvent", id, "winner", opponent);
    assert.fieldEquals("WinEvent", id, "gameId", gameId);
  });
});

describe("Entities", () => {
  beforeAll(() => {
    let challenger = Address.fromString(user);
    let challenged = Address.fromString(opponent);
    let newGameProposedEvent = createGameProposedEvent(challenger, challenged);
    handleGameProposed(newGameProposedEvent);
  });

  afterAll(() => {
    clearStore();
  });

  test("Game created on ProposalEvent", () => {
    assert.entityCount("Game", 1);
    assert.fieldEquals("Game", gameId, "gameId", gameId);
    assert.fieldEquals("Game", gameId, "player1", opponent);
    assert.fieldEquals("Game", gameId, "player2", user);
    assert.fieldEquals("Game", gameId, "moves", "0");
    assert.fieldEquals("Game", gameId, "finished", "false");
  });

  test("Game updated on MoveEvent", () => {
    createMockedFunction(
      contractAddress,
      "getBoards",
      "getBoards(uint256):(uint64,uint64)"
    )
      .withArgs([ethereum.Value.fromUnsignedBigInt(BigInt.fromString("1"))])
      .returns(boardsAfterMove);
    let challenged = Address.fromString(opponent);
    let row = 3;
    let movePerformedEvent = createMovePerformedEvent(
      challenged,
      BigInt.fromString(gameId),
      row
    );
    handleMovePerformed(movePerformedEvent);

    assert.entityCount("Game", 1);
    assert.fieldEquals("Game", gameId, "moves", "1");
    assert.fieldEquals("Game", gameId, "board1", "1");
    assert.fieldEquals("Game", gameId, "board2", "1");
  });

  test("Game updated on WinEvent", () => {
    let challenged = Address.fromString(opponent);
    let gameWonEvent = createGameWonEvent(
      challenged,
      BigInt.fromString(gameId)
    );
    handleGameWon(gameWonEvent);

    assert.entityCount("Game", 1);
    assert.fieldEquals("Game", gameId, "finished", "true");
  });

  test("Stat track events count", () => {
    assert.entityCount("Stat", 1);
    assert.fieldEquals("Stat", "1", "gameId", gameId);
    assert.fieldEquals("Stat", "1", "proposals", "1");
    assert.fieldEquals("Stat", "1", "moves", "1");
    assert.fieldEquals("Stat", "1", "wins", "1");
  });
});
