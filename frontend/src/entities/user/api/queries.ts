import { checkAuthOptions, checkAuthQueryKey } from '@/client/@tanstack/react-query.gen';
import { isLoggedIn } from '@/client/client.gen';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const currentUserQueryKey = checkAuthQueryKey()[0].tags;


export const useGetCurrentUser = () => {
  const queryClient = useQueryClient()
  if (!isLoggedIn){
    queryClient.invalidateQueries({queryKey:currentUserQueryKey})
  }
  return useQuery({
    retry: false,
    ...checkAuthOptions(),
  });
};
