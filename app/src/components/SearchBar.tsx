import React from "react";

type SearchBarProps = {
  onSubmit: (value: string) => void;
};

export function SearchBar({ onSubmit }: SearchBarProps) {
  const [inputValue, setInputValue] = React.useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (inputValue) {
          onSubmit(inputValue);
        }
      }}
      className="flex items-center gap-2 bg-white rounded-lg shadow overflow-hidden w-full max-w-md mx-auto p-2"
    >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-grow px-4 py-2 text-lg text-blue-700"
        placeholder="Search Game by ID"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition-colors text-white text-lg"
      >
        Go
      </button>
    </form>
  );
}
