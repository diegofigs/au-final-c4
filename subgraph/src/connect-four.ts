import { BigInt } from "@graphprotocol/graph-ts";
import {
  GameProposed as GameProposedEvent,
  GameWon as GameWonEvent,
  MovePerformed as MovePerformedEvent,
  ConnectFour
} from "../generated/ConnectFour/ConnectFour";
import {
  ProposalEvent,
  WinEvent,
  MoveEvent,
  Stat,
  Game
} from "../generated/schema";

export function handleGameProposed(event: GameProposedEvent): void {
  let entity = new ProposalEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.challenger = event.params.challenger;
  entity.challenged = event.params.challenged;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let stats = Stat.load("1");
  if (stats === null) {
    stats = new Stat("1");
    stats.gameId = BigInt.fromI32(1);
    stats.proposals = BigInt.fromI32(1);
    stats.moves = BigInt.fromI32(0);
    stats.wins = BigInt.fromI32(0);
  } else {
    stats.gameId = stats.gameId.plus(BigInt.fromI32(1));
    stats.proposals = stats.proposals.plus(BigInt.fromI32(1));
  }

  stats.save();

  let game = new Game(stats.gameId.toString());
  game.gameId = stats.gameId;
  game.player1 = entity.challenged;
  game.player2 = entity.challenger;
  game.moves = 0;
  game.finished = false;

  let contract = ConnectFour.bind(event.address);
  let boards = contract.getBoards(stats.gameId);
  game.board1 = boards.getValue0();
  game.board2 = boards.getValue1();
  game.save();
}

export function handleGameWon(event: GameWonEvent): void {
  let entity = new WinEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.winner = event.params.winner;
  entity.gameId = event.params.gameId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let game = Game.load(entity.gameId.toString());
  if (game === null) {
  } else {
    game.finished = true;
    game.save();
  }

  let stats = Stat.load("1");
  if (stats === null) {
  } else {
    stats.wins = stats.wins.plus(BigInt.fromU32(1));
    stats.save();
  }
}

export function handleMovePerformed(event: MovePerformedEvent): void {
  let entity = new MoveEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.mover = event.params.mover;
  entity.gameId = event.params.gameId;
  entity.row = event.params.row;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let game = Game.load(entity.gameId.toString());
  if (game === null) {
  } else {
    game.moves = game.moves + 1;
    let contract = ConnectFour.bind(event.address);
    let boards = contract.getBoards(entity.gameId);
    game.board1 = boards.getValue0();
    game.board2 = boards.getValue1();
    game.save();
  }

  let stats = Stat.load("1");
  if (stats === null) {
  } else {
    stats.moves = stats.moves.plus(BigInt.fromI32(1));
    stats.save();
  }
}
