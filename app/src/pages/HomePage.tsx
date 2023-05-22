import { PropsWithChildren } from "react";
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
          <Panel className="w-full">
            <h2 className="text-center text-lg">New Games</h2>
            <GameProposalEvents />
          </Panel>

          <Panel className="w-full">
            <h2 className="text-center text-lg">Game Activity</h2>
            <GameMoveEvents />
          </Panel>

          <Panel className="w-full">
            <h2 className="text-center text-lg">Finished Games</h2>
            <GameWonEvents />
          </Panel>
        </div>
      </div>
    </Layout>
  );
}

function GameProposalEvents() {
  const { data: proposals } = useGameProposalEvents();
  return (
    <div className="shadow border-b border-gray-200 sm:rounded-lg">
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
                  proposals.proposalEvents.map((proposalEvent) => (
                    <tr key={proposalEvent.id}>
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
              <tbody>
                {moves &&
                  moves.moveEvents.map((moveEvent) => (
                    <tr key={moveEvent.id}>
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
                  wins.winEvents.map((winEvent) => (
                    <tr key={winEvent.id}>
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
