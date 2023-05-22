import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { ChallengeForm } from "../components/ChallengeForm";
import { SearchGameForm } from "../components/SearchGameForm";
import { Panel } from "../components/Panel";
import { toCompact } from "../utils";
import { useGameProposalEvents } from "../hooks/useGameProposalEvents";
import { useGameWonEvents } from "../hooks/useGameWonEvents";
import { useMovePerformedEvents } from "../hooks/useMovePerformedEvents";

export function HomePage() {
  return (
    <Layout>
      <div className="p-4 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-2">
          <SearchGameForm />
          <ChallengeForm />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <Panel className="w-full p-0">
            <h2 className="text-center text-lg px-6 pt-6">New Games</h2>
            <GameProposalEvents />
          </Panel>

          <Panel className="w-full p-0">
            <h2 className="text-center text-lg px-6 pt-6">Game Activity</h2>
            <GameMoveEvents />
          </Panel>

          <Panel className="w-full p-0">
            <h2 className="text-center text-lg px-6 pt-6">Finished Games</h2>
            <GameWonEvents />
          </Panel>
        </div>
      </div>
    </Layout>
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
                      <tr key={proposalEvent.id} onClick={() => navigate(`/game/${events.length - index}`)}>
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
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
                    <tr key={moveEvent.id} onClick={() => navigate(`/game/${moveEvent.gameId}`)}>
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
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
                    <tr key={winEvent.id} onClick={() => navigate(`/game/${winEvent.gameId}`)}>
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
