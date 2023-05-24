import { useEffect, useMemo } from "react";
import { useAccount } from "wagmi";
import { toBitsByColumn } from "../utils";
import {
  useConnectFourMakeMove,
  usePrepareConnectFourMakeMove,
} from "../generated";
import { Boards, Game } from "../types";
import { Panel } from "./Panel";

type BoardProps = {
  gameId: number;
  game: Game;
  boards: Boards;
};

const BOARD_GRID = Array.from(new Array(7).keys()).map(() =>
  Array.from(new Array(6).keys())
);

export function Board({ boards, game, gameId }: BoardProps) {
  const [b1, b2] = boards;
  const { board1, board2 } = useMemo(() => {
    return {
      board1: Object.values(toBitsByColumn(b1.toString(2))),
      board2: Object.values(toBitsByColumn(b2.toString(2))),
    };
  }, [b1, b2]);

  return (
    <Panel className="w-full board-panel">
      <div className="flex gap-2">
        {BOARD_GRID.map((column, i) => {
          return (
            <BoardColumn
              key={`column-${i}`}
              game={game}
              gameId={gameId}
              column={column}
              columnIndex={i}
              board1={board1}
              board2={board2}
            />
          );
        })}
      </div>
    </Panel>
  );
}

type BoardColumnProps = {
  game: Game;
  gameId: number;
  column: number[];
  columnIndex: number;
  board1: string[][];
  board2: string[][];
};
function BoardColumn(props: BoardColumnProps) {
  const { game, gameId, column, columnIndex: i, board1, board2 } = props;
  const [player1, player2, moves, finished] = game;

  const signer = useAccount();
  const isPlayer1 = signer.address === player1;
  const isPlayer2 = signer.address === player2;
  const isPlayer1Turn = moves % 2 === 0;
  const isPlayer2Turn = moves % 2 === 1;
  const isSignerTurn =
    (isPlayer1 && isPlayer1Turn) || (isPlayer2 && isPlayer2Turn);

  const { config } = usePrepareConnectFourMakeMove({
    args: [BigInt(gameId), i],
    value: BigInt(0),
    enabled: isSignerTurn,
  });
  const {
    write: makeMove,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useConnectFourMakeMove(config);
  useEffect(() => {
    if (isError || isSuccess) {
      const timeout = setTimeout(() => reset(), 3000);
      return () => clearTimeout(timeout);
    }
  }, [isError, isSuccess, reset]);

  const isDisabled = !isSignerTurn || finished;

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      makeMove?.();
    }
  };

  return (
    <button
      disabled={isDisabled}
      className={`flex flex-col flex-grow board-col ${!isDisabled
          ? "hover:shadow-2xl hover:border-purple-500 transform transition-all duration-200 hover:scale-105 disabled:cursor-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:scale-105"
          : ""
        } ${isLoading ? "animate-pulse" : ""} ${isSuccess ? "bg-green-500" : ""
        } ${isError ? "animate-shake bg-red-500" : ""}`}
      onClick={() => {
        reset();
        makeMove?.();
      }}
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      {column.map((_, j) => {
        const isBoard1 = board1[i][j] === "1";
        const isBoard2 = board2[i][j] === "1";
        const isDisc = isBoard1 || isBoard2;
        return (
          <div
            key={`row-${i}-${j}`}
            className={`w-full flex justify-center p-1 sm:p-2 xl:p-3 ${isLoading ? "animate-pulse" : ""
              } ${isError ? "animate-shake bg-red-500" : ""} ${isSuccess ? "animate-drop" : ""
              }`}
          >
            <div
              className={`disc ${isDisc ? "animate-bounce" : ""} ${isBoard1
                  ? "bg-red-500"
                  : isBoard2
                    ? "bg-yellow-500"
                    : "bg-gray-300"
                }`}
            />
          </div>
        );
      })}
    </button>
  );
}
