import { useQuery } from '@tanstack/react-query';
import {
  getGroupsSummaryOptions,
  getGroupByIdOptions,
  getAllGroupsOptions,
  searchGroupsByNameOptions,
} from '@/client/@tanstack/react-query.gen';

export const useGetGroupsSummaryQuery = () => {
  return useQuery({
    ...getGroupsSummaryOptions(),
  });
};

export const useGetGroupQuery = (groupId: number) => {
  return useQuery({ ...getGroupByIdOptions({ path: { group_id: groupId } }) });
};

export const useGetGroupsQuery = () => {
  return useQuery({ ...getAllGroupsOptions() });
};

export const useSearchGroupsQuery = (groupName: string) => {
  const query = groupName.trim();
  return useQuery({
    ...searchGroupsByNameOptions({ query: { query: query } }),
  });
};
