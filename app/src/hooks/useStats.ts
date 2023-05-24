import { gql, useQuery } from "@apollo/client";

const GET_STATS = gql`
  query GetStats {
    stat(id: "1") {
      id
      gameId
      proposals
      moves
      wins
    }
  }
`;

type Stats = {
  id: string;
  gameId: string;
  proposals: number;
  moves: number;
  wins: number;
};

type GetStatsResult = {
  stat: Stats;
};

export function useStats() {
  const stats = useQuery<GetStatsResult>(GET_STATS);
  return stats;
}
