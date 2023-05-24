import { gql, useQuery } from "@apollo/client";

const GET_GAMES = gql`
  query GetGames {
    games(
      skip: $offset
      first: $limit
      orderBy: createdAt
      orderDirection: desc
    ) {
      id
      gameId
      player1
      player2
      moves
      finished
      board1
      board2
      createdAt
      updatedAt
      winner
    }
  }
`;

type Game = {
  id: string;
  gameId: string;
  player1: string;
  player2: string;
  moves: number;
  finished: boolean;
  board1: string;
  board2: string;
  createdAt: string;
  updatedAt: string;
  winner: string | null;
};

type GetGamesResult = {
  games: Game[];
};

export function useGames(page: number, pageSize: number) {
  const games = useQuery<GetGamesResult>(GET_GAMES, {
    variables: {
      offset: (page - 1) * pageSize,
      limit: pageSize,
    },
  });
  return games;
}
