import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useConnectFourChallenge,
  usePrepareConnectFourChallenge,
} from "../generated";
import { Address } from "wagmi";

export function HomePage() {
  return (
    <div className="p-4 flex flex-col gap-2">
      <div className="flex flex-col lg:flex-row gap-2">
        <SearchGame />
        <ChallengeForm />
      </div>
    </div>
  );
}

function SearchGame() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (search) {
        navigate(`/game/${search}`);
      }
    },
    [navigate, search]
  );

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-2 bg-white rounded-lg shadow overflow-hidden w-full max-w-sm md:max-w-lg mx-auto p-2"
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-grow px-4 py-2 text-lg text-blue-700"
        placeholder="Search Game by ID"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition-colors text-white text-lg"
      >
        Search
      </button>
    </form>
  );
}

function ChallengeForm() {
  const [opponent, setOpponent] = useState<Address | string>("");
  const { config } = usePrepareConnectFourChallenge({
    args: [opponent as Address],
    value: BigInt(0),
  });
  const { write: challenge } = useConnectFourChallenge(config);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        challenge?.();
      }}
      className="flex items-center gap-2 bg-white rounded-lg shadow overflow-hidden w-full max-w-sm md:max-w-lg lg:max-w-2xl mx-auto p-2"
    >
      <input
        value={opponent}
        onChange={(e) => setOpponent(e.target.value as Address)}
        className="flex-grow px-4 py-2 text-lg text-blue-700"
        placeholder="Enter opponent's address..."
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md transition-colors text-white text-lg"
      >
        Create Game
      </button>
    </form>
  );
}
