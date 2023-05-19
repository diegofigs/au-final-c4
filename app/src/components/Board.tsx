import { useMemo } from "react";
import { toBitsByColumn } from "../utils";
import {
  useConnectFourMakeMove,
  usePrepareConnectFourMakeMove,
} from "../generated";
import { Boards, Game } from "../types";
import { useAccount } from "wagmi";
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
  const { config } = usePrepareConnectFourMakeMove({
    args: [BigInt(gameId), i],
    value: BigInt(0),
  });
  const { write: makeMove } = useConnectFourMakeMove(config);
  const signer = useAccount();

  const [player1, player2, moves, finished] = game;
  const isPlayer1 = signer.address === player1;
  const isPlayer2 = signer.address === player2;
  const isPlayer1Turn = moves % 2 === 0;
  const isPlayer2Turn = moves % 2 === 1;
  const isCurrentTurn =
    (isPlayer1 && isPlayer1Turn) || (isPlayer2 && isPlayer2Turn);
  const isActive = !finished;

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      if (isCurrentTurn && isActive) {
        makeMove?.();
      }
    }
  };

  const handleClick = () => {
    if (isCurrentTurn && isActive) {
      makeMove?.();
    }
  };
  return (
    <div
      key={`column-${i}`}
      className={`flex flex-col flex-grow board-col ${
        isCurrentTurn && isActive
          ? "hover:shadow-2xl hover:border-purple-500 transform transition-all duration-200 hover:scale-105 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:scale-105"
          : ""
      }`}
      onClick={handleClick}
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
            className="bg-blue-700 flex justify-center p-2 md:p-3"
          >
            <div
              className={`disc ${isDisc ? "animate-bounce" : ""} ${
                isBoard1
                  ? "bg-red-500"
                  : isBoard2
                  ? "bg-yellow-500"
                  : "bg-gray-300"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
}
