import { PropsWithChildren, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Panel } from "../components/Panel";
import { toCompact } from "../utils";
import { useProposalEvents } from "../hooks/useProposalEvents";
import { useWinEvents } from "../hooks/useWinEvents";
import { useMoveEvents } from "../hooks/useMoveEvents";
import { useStats } from "../hooks/useStats";

export function EventsPage() {
  const { data: stats } = useStats();
  return (
    <Layout>
      <div className="p-4 flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Panel className="w-full p-0">
            <h3 className="text-center text-lg px-6 pt-6">Challenges</h3>
            <GameProposalEvents total={stats?.stat.proposals} />
          </Panel>
          <Panel className="w-full p-0">
            <h3 className="text-center text-lg px-6 pt-6">Wins</h3>
            <GameWonEvents total={stats?.stat.wins} />
          </Panel>
          <Panel className="w-full p-0 md:col-span-2 md:w-fit md:mx-auto">
            <h3 className="text-center text-lg px-6 pt-6">Moves</h3>
            <GameMoveEvents total={stats?.stat.moves} />
          </Panel>
        </div>
      </div>
    </Layout>
  );
}

type EventsTableProps = {
  total?: number;
};
function GameProposalEvents({ total }: EventsTableProps) {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const { data: proposals } = useProposalEvents(page, pageSize);
  return (
    <>
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
      <Paginator
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        total={total}
      />
    </>
  );
}

function GameMoveEvents({ total }: EventsTableProps) {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const { data: moves } = useMoveEvents(page, pageSize);
  const navigate = useNavigate();
  return (
    <>
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
                    Mover
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
                  moves.moveEvents.map((moveEvent) => (
                    <tr
                      key={moveEvent.id}
                      className="cursor-pointer"
                      onClick={() => navigate(`/game/${moveEvent.gameId}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {toCompact(moveEvent.mover)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {moveEvent.gameId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {moveEvent.row + 1}
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
      <Paginator
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        total={total}
      />
    </>
  );
}

function GameWonEvents({ total }: EventsTableProps) {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const { data: wins } = useWinEvents(page, pageSize);
  const navigate = useNavigate();
  return (
    <>
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
      <Paginator
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        total={total}
      />
    </>
  );
}

type PaginatorProps = {
  page: number;
  setPage: (value: number) => void;
  pageSize: number;
  total?: number;
};
function Paginator({ page, setPage, pageSize, total }: PaginatorProps) {
  const totalPages = total ? Math.ceil(total / pageSize) : 0;

  return (
    <div className="flex justify-center my-2 text-gray-500 bg-white">
      <button
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page <= 1}
        className={`px-4 py-2 border border-gray-300 rounded mr-2 ${
          page <= 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-200 cursor-pointer"
        }`}
      >
        Prev
      </button>
      <span className="mx-4 self-center">
        Page {page}
        {total && ` of ${totalPages}`}
      </span>
      <button
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        className={`px-4 py-2 border border-gray-300 rounded ml-2 ${
          page >= totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-200 cursor-pointer"
        }`}
      >
        Next
      </button>
    </div>
  );
}

function Layout({ children }: PropsWithChildren) {
  return <div className="container mx-auto">{children}</div>;
}
