import { gql, useQuery } from "@apollo/client";

const GET_PROPOSALS = gql`
  query GetProposals {
    proposalEvents {
      id
      challenger
      challenged
      blockNumber
      blockTimestamp
    }
  }
`;

type ProposalEvent = {
  id: string;
  challenger: string;
  challenged: string;
  blockNumber: string;
  blockTimestamp: string;
};

type GetProposalsResult = {
  proposalEvents: ProposalEvent[];
};

export function useGameProposalEvents() {
  const proposals = useQuery<GetProposalsResult>(GET_PROPOSALS);
  return proposals;
}
