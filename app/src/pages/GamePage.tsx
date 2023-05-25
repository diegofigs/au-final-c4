import { useParams } from "react-router-dom";
import { Panel } from "../components/Panel";
import { Board } from "../components/Board";
import { useConnectFourGetBoards, useConnectFourGetGame } from "../generated";
import { toCompact } from "../utils";
import { Game } from "../types";

export function GamePage() {
  const { gameId } = useParams();
  const { data: gameData } = useConnectFourGetGame({
    args: [BigInt(gameId || "0")],
    watch: true,
  });

  const { data: boardData } = useConnectFourGetBoards({
    args: [BigInt(gameId || "0")],
    watch: true,
  });

  return (
    <div className="container mx-auto sm:p-2 md:p-4">
      <Panel className="shadow-none rounded-none sm:shadow-md sm:rounded-md h-full">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl whitespace-nowrap">Game #{gameId}</h2>
          {gameData && gameId !== undefined && <GameRow game={[...gameData]} />}
          {boardData && gameId && gameData && (
            <Board
              gameId={parseInt(gameId)}
              boards={[...boardData]}
              game={[...gameData]}
            />
          )}
        </div>
      </Panel>
    </div>
  );
}

type GameRowProps = {
  game: Game;
};
function GameRow({ game }: GameRowProps) {
  const [player1, player2, moves, finished] = game;

  return (
    <div className="w-full flex items-center gap-2 text-center text-sm md:text-md lg:text-lg">
      <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 place-content-center gap-2 my-2">
        <span
          id="player1"
          className="inline-block rounded px-3 py-1 bg-blue-500 text-white"
        >
          P1: {toCompact(player1)}
        </span>
        <span
          id="player2"
          className="inline-block rounded px-3 py-1 bg-red-500 text-white"
        >
          P2: {toCompact(player2)}
        </span>
        <span
          id="moves"
          className="inline-block rounded px-3 py-1 bg-green-500 text-white"
        >
          Moves: {moves}
        </span>
        <span
          id="finished"
          className={`inline-block rounded px-3 py-1 text-white ${
            finished ? "bg-green-500" : "bg-gray-500"
          }`}
        >
          Finished: {finished ? "Yes" : "No"}
        </span>

        <div className="col-span-2 md:col-span-4 lg:col-span-1 place-self-end">
          <TurnIndicator isPlayer1Turn={moves % 2 === 0} />
        </div>
      </div>
    </div>
  );
}
type TurnIndicatorProps = {
  isPlayer1Turn: boolean;
};

function TurnIndicator({ isPlayer1Turn }: TurnIndicatorProps) {
  return (
    <div className="flex rounded-md shadow-sm" role="group">
      <span
        className={`px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 rounded-l-md hover:text-white dark:border-gray-600 dark:text-white dark:hover:text-white ${
          isPlayer1Turn
            ? "bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 text-white"
            : "bg-gray-400"
        }`}
      >
        Player 1
      </span>
      <span
        className={`px-4 py-2 text-sm font-medium text-gray-900 border-t border-b border-gray-200 rounded-r-md hover:text-white dark:border-gray-600 dark:text-white dark:hover:text-white ${
          !isPlayer1Turn
            ? "bg-gradient-to-r from-red-400 via-red-500 to-yellow-500 text-white"
            : "bg-gray-400"
        }`}
      >
        Player 2
      </span>
    </div>
  );
}
