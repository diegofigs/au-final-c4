import { useState } from "react";
import { Address, useEnsAddress } from "wagmi";
import { useConnectFourChallenge, usePrepareConnectFourChallenge } from "../generated";

export function ChallengeForm() {
  const [opponent, setOpponent] = useState<Address | string>("");
  const { data: ensAddress } = useEnsAddress({ name: opponent });
  const { config } = usePrepareConnectFourChallenge({
    args: [ensAddress ? ensAddress : opponent as Address],
    value: BigInt(0),
  });
  const { write: challenge } = useConnectFourChallenge(config);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        challenge?.();
      }}
      className="flex items-center gap-1 md:gap-2 bg-white rounded-lg shadow overflow-hidden w-full md:max-w-lg lg:max-w-2xl p-2 text-sm md:text-md lg:text-lg"
    >
      <input
        value={opponent}
        onChange={(e) => setOpponent(e.target.value)}
        className="flex-1 px-2 md:px-4 py-1 md:py-2 text-blue-700"
        placeholder="0xYz..."
      />
      <button
        type="submit"
        className="max-w-[110px] w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md transition-colors text-white"
      >
        Challenge
      </button>
    </form>
  );
}
