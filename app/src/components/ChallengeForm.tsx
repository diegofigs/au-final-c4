import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Address, useChainId, useEnsAddress, usePublicClient } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { isAddress } from "viem";
import {
  useConnectFourChallenge,
  usePrepareConnectFourChallenge,
} from "../generated";
import { connectFourABI } from "../generated";
import { connectFourAddress } from "../generated";

export function ChallengeForm() {
  const [opponent, setOpponent] = useState<Address | string>("");
  const { data: ensAddress } = useEnsAddress({
    name: opponent,
    enabled: false,
  });
  const { config } = usePrepareConnectFourChallenge({
    args: [ensAddress ? ensAddress : (opponent as Address)],
    value: BigInt(0),
    enabled: !!ensAddress || isAddress(opponent),
  });
  const {
    writeAsync: challenge,
    isLoading,
    isError,
    reset,
  } = useConnectFourChallenge(config);
  const navigate = useNavigate();

  const id = useChainId();
  const client = usePublicClient();

  useEffect(() => {
    if (isError) {
      const timeout = setTimeout(() => reset(), 3000);
      return () => clearTimeout(timeout);
    }
  }, [isError, reset]);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (id === polygonMumbai.id) {
          const { result: gameId } = await client.simulateContract({
            abi: connectFourABI,
            address: connectFourAddress[id],
            functionName: "challenge",
            args: [opponent as Address],
            value: BigInt(0),
          });
          await challenge?.();
          navigate(`/game/${gameId.toString()}`);
        }
      }}
      className="flex items-center gap-1 md:gap-2 bg-white rounded-lg shadow overflow-hidden w-full md:max-w-lg lg:max-w-2xl p-2 text-sm md:text-md lg:text-lg"
    >
      <input
        value={opponent}
        onChange={(e) => setOpponent(e.target.value)}
        className={`flex-1 px-2 md:px-4 py-1 md:py-2 ${
          isError ? "border-2 border-red-500" : ""
        }`}
        placeholder="0xYz..."
      />
      <button
        type="submit"
        disabled={isLoading || isError || !challenge}
        className={`max-w-[110px] w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 rounded-md transition-colors text-white
        ${isLoading ? "animate-pulse" : ""} ${isError ? "animate-shake" : ""}`}
      >
        Challenge
      </button>
    </form>
  );
}
