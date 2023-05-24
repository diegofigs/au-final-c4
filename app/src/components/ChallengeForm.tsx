import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Address, useEnsAddress, useWaitForTransaction } from "wagmi";
import { isAddress } from "viem";
import {
  useConnectFourChallenge,
  usePrepareConnectFourChallenge,
} from "../generated";

export function ChallengeForm() {
  const [opponent, setOpponent] = useState<Address | string>("");
  const { data: ensAddress } = useEnsAddress({
    name: opponent,
    enabled: false,
  });
  const { config, data } = usePrepareConnectFourChallenge({
    args: [ensAddress ? ensAddress : (opponent as Address)],
    value: BigInt(0),
    enabled: !!ensAddress || isAddress(opponent),
  });
  const {
    write: challenge,
    data: challengeTx,
    isLoading,
    isError,
  } = useConnectFourChallenge(config);
  const {
    isLoading: isSubmitting,
    isSuccess,
  } = useWaitForTransaction({
    hash: challengeTx?.hash,
  });
  const navigate = useNavigate();

  const gameId = data?.result;
  useEffect(() => {
    if (isSuccess && gameId) {
      navigate(`/game/${gameId.toString()}`);
    }
  }, [isSuccess, gameId, navigate]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (gameId) {
          challenge?.();
        }
      }}
      className="
      flex items-center gap-2 bg-white rounded-lg shadow 
      overflow-hidden w-full md:max-w-lg lg:max-w-2xl p-2 
      text-sm md:text-md lg:text-lg
      "
    >
      <div className="flex-1">
        <input
          placeholder="0xYz..."
          value={opponent}
          onChange={(e) => setOpponent(e.target.value)}
          minLength={5}
          required
          className={`w-full px-2 md:px-4 py-1.5 md:py-2 ${
            isError ? "border-2 border-red-500" : ""
          }`}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || isSubmitting}
        className={`max-w-[110px] w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 rounded-md transition-colors text-white
        ${isLoading ? "animate-pulse" : ""} ${isError ? "animate-shake" : ""}`}
      >
        Challenge
      </button>
    </form>
  );
}
