import {
  GameProposed as GameProposedEvent,
  GameWon as GameWonEvent,
  MovePerformed as MovePerformedEvent
} from "../generated/ConnectFour/ConnectFour"
import { ProposalEvent, WinEvent, MoveEvent } from "../generated/schema"

export function handleGameProposed(event: GameProposedEvent): void {
  let entity = new ProposalEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.challenger = event.params.challenger
  entity.challenged = event.params.challenged

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGameWon(event: GameWonEvent): void {
  let entity = new WinEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.winner = event.params.winner
  entity.gameId = event.params.gameId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMovePerformed(event: MovePerformedEvent): void {
  let entity = new MoveEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.mover = event.params.mover
  entity.gameId = event.params.gameId
  entity.row = event.params.row

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
