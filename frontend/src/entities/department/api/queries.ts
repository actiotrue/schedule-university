import { getAllDepartmentsOptions } from '@/client/@tanstack/react-query.gen';
import { useQuery } from '@tanstack/react-query';

export const useGetDepartmentsQuery = () => {
  return useQuery({
    ...getAllDepartmentsOptions(),
  });
};
