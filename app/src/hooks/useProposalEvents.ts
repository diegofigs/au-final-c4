import { gql, useQuery } from "@apollo/client";

const GET_PROPOSALS = gql`
  query GetProposals {
    proposalEvents(
      skip: $offset
      first: $limit
      sortBy: blockTimestamp
      sortDirection: desc
    ) {
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

export function useProposalEvents(page: number, pageSize: number) {
  const proposals = useQuery<GetProposalsResult>(GET_PROPOSALS, {
    variables: {
      offset: (page - 1) * pageSize,
      limit: pageSize,
    },
  });
  return proposals;
}
