import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export function SearchGameForm() {
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
      className="
      flex items-center gap-2 bg-white rounded-lg shadow 
      w-full md:max-w-lg lg:max-w-2xl p-2 text-sm md:text-md lg:text-lg
      "
    >
      <div className="flex-1">
        <input
          placeholder="Game ID#"
          type="number"
          min={1}
          value={search}
          minLength={1}
          required
          onChange={(e) => setSearch(e.target.value)}
          className="
          w-full px-2 md:px-4 py-1.5 md:py-2 rounded 
          out-of-range:border-2 valid:border-2
          invalid:border-red-500 valid:border-green-500
          "
        />
      </div>
      <button
        type="submit"
        disabled={!search}
        className="
        max-w-[110px] w-full px-4 py-2 rounded-md 
        bg-blue-500 hover:bg-blue-600 active:bg-blue-700 
        transition-colors text-white
        "
      >
        Search
      </button>
    </form>
  );
}
