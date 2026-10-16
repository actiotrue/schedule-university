import {
  getSubjectByIdOptions,
  getAllSubjectsOptions,
} from '@/client/@tanstack/react-query.gen';
import { useQuery } from '@tanstack/react-query';

export const useGetSubjectQuery = (subjectId: number) => {
  return useQuery({
    ...getSubjectByIdOptions({ path: { subject_id: subjectId } }),
  });
};

export const useGetSubjectsQuery = () => {
  return useQuery({ ...getAllSubjectsOptions() });
};
