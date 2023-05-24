import { gql, useQuery } from "@apollo/client";

const GET_MOVES = gql`
  query GetMoves($offset: Int!, $limit: Int!) {
    moveEvents(
      skip: $offset
      first: $limit
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
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
  row: number;
  blockNumber: string;
  blockTimestamp: string;
};

type GetMovesResult = {
  moveEvents: MoveEvent[];
};

export function useMovePerformedEvents(page: number, pageSize: number) {
  const moves = useQuery<GetMovesResult>(GET_MOVES, {
    variables: {
      offset: (page - 1) * pageSize,
      limit: pageSize,
    },
  });
  return moves;
}
