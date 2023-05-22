import { gql, useQuery } from "@apollo/client";

const GET_MOVES = gql`
  query GetMoves {
    moveEvents {
      id
      mover
      gameId
      row
      blockNumber
      blockTimestamp
    }
  }
`;

type MoveEvent = {
  id: string;
  mover: string;
  gameId: string;
  row: string;
  blockNumber: string;
  blockTimestamp: string;
};

type GetMovesResult = {
  moveEvents: MoveEvent[];
};

export function useMovePerformedEvents() {
  const moves = useQuery<GetMovesResult>(GET_MOVES);
  return moves;
}
