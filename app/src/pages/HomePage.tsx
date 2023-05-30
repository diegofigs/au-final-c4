import { PropsWithChildren, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { ChallengeForm } from "../components/ChallengeForm";
import { SearchGameForm } from "../components/SearchGameForm";
import { Panel } from "../components/Panel";
import { toCompact } from "../utils";
import { useGames } from "../hooks/useGames";
import { Paginator } from "../components/Paginator";
import { useStats } from "../hooks/useStats";

export function HomePage() {
  return (
    <Layout>
      <div className="p-4 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-2">
          <SearchGameForm />
          <ChallengeForm />
        </div>
        <Panel className="p-0 md:mx-auto">
          <h2 className="text-center text-lg px-6 pt-6">Games</h2>
          <GamesList />
        </Panel>
      </div>
    </Layout>
  );
}

function GamesList() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const { data: gamesData } = useGames(1, 10);
  const { data: stats } = useStats();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col border-b border-gray-200">
      <div className="flex flex-col overflow-x-auto w-full">
        <div className="sm:-mx-2">
          <div className="inline-block py-2">
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
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Winner
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {gamesData &&
                  gamesData.games.map((game) => (
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
                      <td
                        className={`flex justify-center px-6 py-4 whitespace-nowrap text-lg text-gray-500 ${
                          game.finished ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {game.finished ? <HiCheckCircle /> : <HiXCircle />}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {game.winner ? toCompact(game.winner) : "-"}
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
        total={parseInt(stats?.stat.gameId || "0")}
      />
    </div>
  );
}

function Layout({ children }: PropsWithChildren) {
  return <div className="container mx-auto">{children}</div>;
}
