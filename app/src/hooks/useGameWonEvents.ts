import { gql, useQuery } from "@apollo/client";

const GET_WINS = gql`
  query GetWins {
    winEvents {
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

export function useGameWonEvents() {
  const wins = useQuery<GetWinsResult>(GET_WINS);
  return wins;
}
