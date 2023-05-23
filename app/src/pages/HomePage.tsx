import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { ChallengeForm } from "../components/ChallengeForm";
import { SearchGameForm } from "../components/SearchGameForm";
import { Panel } from "../components/Panel";
import { toCompact } from "../utils";
import { useGameProposalEvents } from "../hooks/useGameProposalEvents";
import { useGameWonEvents } from "../hooks/useGameWonEvents";
import { useMovePerformedEvents } from "../hooks/useMovePerformedEvents";
import { useGames } from "../hooks/useGames";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

export function HomePage() {
  return (
    <Layout>
      <div className="p-4 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-2">
          <SearchGameForm />
          <ChallengeForm />
        </div>
        <Panel className="p-0 mx-auto">
          <h2 className="text-center text-lg px-6 pt-6">Games</h2>
          <GamesList />
        </Panel>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <Panel className="w-full p-0">
            <h3 className="text-center text-lg px-6 pt-6">Challenges</h3>
            <GameProposalEvents />
          </Panel>

          <Panel className="w-full p-0">
            <h3 className="text-center text-lg px-6 pt-6">Moves</h3>
            <GameMoveEvents />
          </Panel>

          <Panel className="w-full p-0">
            <h3 className="text-center text-lg px-6 pt-6">Wins</h3>
            <GameWonEvents />
          </Panel>
        </div>
      </div>
    </Layout>
  );
}

function GamesList() {
  const { data: gamesData } = useGames();
  const navigate = useNavigate();
  return (
    <div className="border-b border-gray-200">
      <div className="flex flex-col overflow-x-auto w-full">
        <div className="sm:-mx-2">
          <div className="inline-block py-2 sm:px-2">
            <table className="min-w-full text-left text-sm font-light divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Player 1
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Player 2
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Moves
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Finished
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {gamesData &&
                  [...gamesData.games].map((game) => (
                    <tr
                      key={`game-${game.gameId}`}
                      className="cursor-pointer"
                      onClick={() => navigate(`/game/${game.gameId}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {game.gameId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {toCompact(game.player1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {toCompact(game.player2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {game.moves}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {game.finished ? <HiCheckCircle /> : <HiXCircle />}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function GameProposalEvents() {
  const { data: proposals } = useGameProposalEvents();
  const navigate = useNavigate();
  return (
    <div className="border-b border-gray-200">
      <div className="flex flex-col overflow-x-auto w-full">
        <div className="sm:-mx-2">
          <div className="inline-block py-2 sm:px-2">
            <table className="min-w-full text-left text-sm font-light divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Player 1
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Player 2
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <span>Timestamp</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {proposals &&
                  [...proposals.proposalEvents]
                    .sort(
                      (a, b) =>
                        parseInt(b.blockNumber) - parseInt(a.blockNumber)
                    )
                    .map((proposalEvent, index, events) => (
                      <tr
                        key={proposalEvent.id}
                        className="cursor-pointer"
                        onClick={() =>
                          navigate(`/game/${events.length - index}`)
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {events.length - index}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {toCompact(proposalEvent.challenged)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {toCompact(proposalEvent.challenger)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(
                            Number(proposalEvent.blockTimestamp) * 1000
                          ).toLocaleString()}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function GameMoveEvents() {
  const { data: moves } = useMovePerformedEvents();
  const navigate = useNavigate();
  return (
    <div className="border-b border-gray-200">
      <div className="flex flex-col overflow-x-auto w-full">
        <div className="sm:-mx-2">
          <div className="inline-block py-2 sm:px-2">
            <table className="min-w-full text-left text-sm font-light divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Game
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Move
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {moves &&
                  [...moves.moveEvents]
                    .sort(
                      (a, b) =>
                        parseInt(b.blockNumber) - parseInt(a.blockNumber)
                    )
                    .map((moveEvent) => (
                      <tr
                        key={moveEvent.id}
                        className="cursor-pointer"
                        onClick={() => navigate(`/game/${moveEvent.gameId}`)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {moveEvent.gameId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {parseInt(moveEvent.row) + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(
                            Number(moveEvent.blockTimestamp) * 1000
                          ).toLocaleString()}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function GameWonEvents() {
  const { data: wins } = useGameWonEvents();
  const navigate = useNavigate();
  return (
    <div className="border-b border-gray-200">
      <div className="flex flex-col overflow-x-auto w-full">
        <div className="sm:-mx-2">
          <div className="inline-block py-2 sm:px-2">
            <table className="min-w-full text-left text-sm font-light divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Winner
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Game
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {wins &&
                  [...wins.winEvents]
                    .sort(
                      (a, b) =>
                        parseInt(b.blockNumber) - parseInt(a.blockNumber)
                    )
                    .map((winEvent) => (
                      <tr
                        key={winEvent.id}
                        className="cursor-pointer"
                        onClick={() => navigate(`/game/${winEvent.gameId}`)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {toCompact(winEvent.winner)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {winEvent.gameId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(
                            Number(winEvent.blockTimestamp) * 1000
                          ).toLocaleString()}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function Layout({ children }: PropsWithChildren) {
  return <div className="container mx-auto">{children}</div>;
}
