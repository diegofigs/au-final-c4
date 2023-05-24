import { gql, useQuery } from "@apollo/client";

const GET_WINS = gql`
  query GetWins {
    winEvents(
      skip: $offset
      first: $limit
      sortBy: blockTimestamp
      sortDirection: desc
    ) {
      id
      winner
      gameId
      blockNumber
      blockTimestamp
    }
  }
`;

type WinEvent = {
  id: string;
  winner: string;
  gameId: string;
  blockNumber: string;
  blockTimestamp: string;
};

type GetWinsResult = {
  winEvents: WinEvent[];
};

export function useWinEvents(page: number, pageSize: number) {
  const wins = useQuery<GetWinsResult>(GET_WINS, {
    variables: {
      offset: (page - 1) * pageSize,
      limit: pageSize,
    },
  });
  return wins;
}
