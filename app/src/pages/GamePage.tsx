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
    <div className="flex p-4 gap-2">
      <Panel className="flex-1">
        <h2 className="text-2xl">Game #{gameId}</h2>
        {gameData && <GameRow game={[...gameData]} />}
        {boardData && gameId && gameData && (
          <Board
            gameId={parseInt(gameId)}
            boards={[...boardData]}
            game={[...gameData]}
          />
        )}
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
    <div className="flex items-center">
      <div className="w-full flex gap-4 my-4">
        <div className="flex items-center">
          <label htmlFor="player1" className="font-bold mr-2">
            P1:{" "}
          </label>
          <span
            id="player1"
            className="rounded-full px-4 py-2 bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 text-white"
          >
            {toCompact(player1)}
          </span>
        </div>
        <div className="flex items-center">
          <label htmlFor="player2" className="font-bold mr-2">
            P2:{" "}
          </label>
          <span
            id="player2"
            className="rounded-full px-4 py-2 bg-gradient-to-r from-red-400 via-red-500 to-yellow-500 text-white"
          >
            {toCompact(player2)}
          </span>
        </div>
        <div className="flex items-center">
          <label htmlFor="moves" className="font-bold mr-2">
            Moves:{" "}
          </label>
          <span
            id="moves"
            className="rounded-full px-4 py-2 bg-gradient-to-r from-green-400 via-green-500 to-blue-500 text-white"
          >
            {moves}
          </span>
        </div>
        <div className="flex items-center">
          <label htmlFor="finished" className="font-bold mr-2">
            Finished:{" "}
          </label>
          <span
            id="finished"
            className={`rounded-full px-4 py-2 bg-gradient-to-r text-white ${
              finished
                ? "from-green-400 via-green-500 to-green-600"
                : "from-gray-400 via-gray-500 to-gray-600 "
            }`}
          >
            {finished ? "Yes" : "No"}
          </span>
        </div>
      </div>
      {!finished && (
        <div className="flex-none">
          <TurnIndicator isPlayer1Turn={moves % 2 === 0} />
        </div>
      )}
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
            : "bg-gray-400 opacity-75"
        }`}
      >
        Player 1
      </span>
      <span
        className={`px-4 py-2 text-sm font-medium text-gray-900 border-t border-b border-gray-200 rounded-r-md hover:text-white dark:border-gray-600 dark:text-white dark:hover:text-white ${
          !isPlayer1Turn
            ? "bg-gradient-to-r from-red-400 via-red-500 to-yellow-500 text-white"
            : "bg-gray-400 opacity-75"
        }`}
      >
        Player 2
      </span>
    </div>
  );
}
