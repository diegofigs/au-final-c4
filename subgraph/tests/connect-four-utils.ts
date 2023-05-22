import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  GameProposed,
  GameWon,
  MovePerformed
} from "../generated/ConnectFour/ConnectFour"

export function createGameProposedEvent(
  challenger: Address,
  challenged: Address
): GameProposed {
  let gameProposedEvent = changetype<GameProposed>(newMockEvent())

  gameProposedEvent.parameters = new Array()

  gameProposedEvent.parameters.push(
    new ethereum.EventParam(
      "challenger",
      ethereum.Value.fromAddress(challenger)
    )
  )
  gameProposedEvent.parameters.push(
    new ethereum.EventParam(
      "challenged",
      ethereum.Value.fromAddress(challenged)
    )
  )

  return gameProposedEvent
}

export function createGameWonEvent(winner: Address, gameId: BigInt): GameWon {
  let gameWonEvent = changetype<GameWon>(newMockEvent())

  gameWonEvent.parameters = new Array()

  gameWonEvent.parameters.push(
    new ethereum.EventParam("winner", ethereum.Value.fromAddress(winner))
  )
  gameWonEvent.parameters.push(
    new ethereum.EventParam("gameId", ethereum.Value.fromUnsignedBigInt(gameId))
  )

  return gameWonEvent
}

export function createMovePerformedEvent(
  mover: Address,
  gameId: BigInt,
  row: i32
): MovePerformed {
  let movePerformedEvent = changetype<MovePerformed>(newMockEvent())

  movePerformedEvent.parameters = new Array()

  movePerformedEvent.parameters.push(
    new ethereum.EventParam("mover", ethereum.Value.fromAddress(mover))
  )
  movePerformedEvent.parameters.push(
    new ethereum.EventParam("gameId", ethereum.Value.fromUnsignedBigInt(gameId))
  )
  movePerformedEvent.parameters.push(
    new ethereum.EventParam(
      "row",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(row))
    )
  )

  return movePerformedEvent
}
