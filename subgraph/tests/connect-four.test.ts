import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index";
import { Address, bigInt } from "@graphprotocol/graph-ts";
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
let id = "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000";
let user = "0x0000000000000000000000000000000000000001";
let opponent = "0x0000000000000000000000000000000000000002";
let gameId = "1";

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

  test("GameProposed created and stored", () => {
    assert.entityCount("GameProposed", 1);

    assert.fieldEquals("GameProposed", id, "challenger", user);
    assert.fieldEquals("GameProposed", id, "challenged", opponent);

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  });

  test("GameMove created and stored", () => {
    let challenged = Address.fromString(opponent);
    let row = 3;
    let movePerformedEvent = createMovePerformedEvent(
      challenged,
      bigInt.fromString(gameId),
      row
    );
    handleMovePerformed(movePerformedEvent);

    assert.entityCount("MovePerformed", 1);
    assert.fieldEquals("MovePerformed", id, "mover", opponent);
    assert.fieldEquals("MovePerformed", id, "gameId", gameId);
    assert.fieldEquals("MovePerformed", id, "row", row.toString());
  });

  test("GameWon created and stored", () => {
    let challenged = Address.fromString(opponent);
    let gameWonEvent = createGameWonEvent(
      challenged,
      bigInt.fromString(gameId)
    );
    handleGameWon(gameWonEvent);

    assert.entityCount("GameWon", 1);
    assert.fieldEquals("GameWon", id, "winner", opponent);
    assert.fieldEquals("GameWon", id, "gameId", gameId);
  });
});
