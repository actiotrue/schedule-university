import {
  getTeacherByIdOptions,
  getAllTeachersOptions,
  searchTeachersByNameOptions,
} from '@/client/@tanstack/react-query.gen';
import { useQuery } from '@tanstack/react-query';

export const useGetTeachersQuery = () => {
  return useQuery({
    ...getAllTeachersOptions(),
  });
};

export const useGetTeacherQuery = (teacherId: number) => {
  return useQuery({
    ...getTeacherByIdOptions({ path: { teacher_id: teacherId } }),
  });
};

export const searchTeachersQuery = (teacherName: string) => {
  const query = teacherName.trim();
  return useQuery({
    ...searchTeachersByNameOptions({ query: { query: query } }),
  });
};
