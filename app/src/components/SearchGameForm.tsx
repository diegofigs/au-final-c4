import { FormEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export function SearchGameForm() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const onSubmit = useCallback(
    (e: FormEvent) => {
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
      className="flex items-center gap-1 md:gap-2 bg-white rounded-lg shadow overflow-hidden w-full md:max-w-lg lg:max-w-2xl p-2 text-sm md:text-md lg:text-lg"
    >
      <input
        type="number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 px-2 md:px-4 py-1 md:py-2 text-blue-700"
        placeholder="Game ID"
      />
      <button
        type="submit"
        className="max-w-[110px] w-full px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition-colors text-white"
      >
        Search
      </button>
    </form>
  );
}
