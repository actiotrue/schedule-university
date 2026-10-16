import { UpdateTeacher, DeleteTeacher } from '@/features/manage-teacher';
import {
  Panel,
  PanelHeader,
  PanelBody,
  SearchInput,
  Select,
} from '@/shared/ui/generic';
import { useState } from 'react';
import { MdPhoneIphone } from 'react-icons/md';
import { useGetTeachersQuery } from '../api/queries';
import { DEPARTMENTS } from '../model/consts';
import { HiOutlineMail } from 'react-icons/hi';
import { formatTeacherInitials } from '../model/utils';

export const TeachersList = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  const teachersQuery = useGetTeachersQuery();
  const teachers = teachersQuery.data;

  const filtredTeachers = teachers?.filter((teacher) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = teacher.lastName.toLowerCase().includes(query);
    const matchesDepartments =
      selectedDepartment === 'all' || selectedDepartment === teacher.department;
    return matchesSearch && matchesDepartments;
  });

  return (
    <>
      <Panel className="mb-8">
        <PanelHeader>Поиск</PanelHeader>
        <PanelBody>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 sm:flex-[2] min-w-0">
              <SearchInput
                value={searchQuery}
                placeholder="Введите имя преподавателя..."
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-1 min-w-0">
              <Select onChange={(e) => setSelectedDepartment(e.target.value)}>
                <option value={'all'}>Все кафедры</option>
                {DEPARTMENTS.map((depart) => (
                  <option key={depart} value={depart}>
                    {depart}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </PanelBody>
      </Panel>
      <Panel>
        <PanelHeader>Преподаватели ({teachers?.length})</PanelHeader>
        <PanelBody>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>ФИО</th>
                  <th>Кафедра</th>
                  <th>Степень</th>
                  <th>Контакты</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {filtredTeachers?.map((teacher) => (
                  <tr key={teacher.id}>
                    <th>
                      {formatTeacherInitials(
                        teacher.firstName,
                        teacher.lastName,
                        teacher.middleName,
                      )}
                    </th>
                    <td>{teacher.department}</td>
                    <td>{teacher.title}</td>
                    <td>
                      <HiOutlineMail className="inline mr-1" />
                      {teacher.email ? teacher.email : ' —'}
                      <br />
                      <MdPhoneIphone className="inline mr-1" />
                      {teacher.phone ? teacher.phone : ' —'}
                    </td>
                    <td>
                      <UpdateTeacher teacher={teacher} />
                      <DeleteTeacher teacherId={teacher.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PanelBody>
      </Panel>
    </>
  );
};
