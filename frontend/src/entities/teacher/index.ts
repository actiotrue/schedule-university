export {
  useCreateTeacherMutation,
  useDeleteTeacherMutation,
  useUpdateTeacherMutation,
} from './api/mutations';
export { useGetTeacherQuery, useGetTeachersQuery } from './api/queries';
export { TeachersList } from './ui/TeachersList';
export { DEPARTMENTS, TITLES } from './model/consts';
export { formatTeacherInitials } from './model/utils';
