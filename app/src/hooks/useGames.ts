import { gql, useQuery } from "@apollo/client";

const GET_GAMES = gql`
  query GetGames {
    games(orderBy: createdAt, orderDirection: desc) {
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
};

type GetGamesResult = {
  games: Game[];
};

export function useGames() {
  const games = useQuery<GetGamesResult>(GET_GAMES);
  return games;
}
