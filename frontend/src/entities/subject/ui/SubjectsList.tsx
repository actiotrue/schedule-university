import { UpdateSubject, DeleteSubject } from '@/features/manage-subject';
import {
  Panel,
  PanelHeader,
  PanelBody,
  SearchInput,
  Select,
  Badge,
} from '@/shared/ui/generic';
import { useState } from 'react';
import { useGetSubjectsQuery } from '../api/queries';

export const SubjectsList = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRequired, setSelectedRequired] = useState<string>('all');

  const subjectsQuery = useGetSubjectsQuery();
  const subjects = subjectsQuery.data;

  const filtredSubjects = subjects?.filter((subject) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = subject.name.toLowerCase().includes(query);

    if (selectedRequired === 'all') {
      return matchesSearch;
    } else if (selectedRequired === '1') {
      return matchesSearch && subject.isOptional;
    } else if (selectedRequired === '0') {
      return matchesSearch && !subject.isOptional;
    }
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
                placeholder="Введите название предмета..."
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-1 min-w-0">
              <Select onChange={(e) => setSelectedRequired(e.target.value)}>
                <option value={'all'}>Все предметы</option>
                <option value={'1'}>Обязательные</option>
                <option value={'0'}>Опциональные</option>
              </Select>
            </div>
          </div>
        </PanelBody>
      </Panel>
      <Panel>
        <PanelHeader>Предметы ({subjects?.length})</PanelHeader>
        <PanelBody>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Семестр</th>
                  <th>Кол-во часов</th>
                  <th>Обязательный</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {filtredSubjects?.map((subject) => (
                  <tr key={subject.id}>
                    <th>{subject.name}</th>
                    <td>{subject.semester}</td>
                    <td>{subject.totalHours}</td>
                    <td>
                      {subject.isOptional === true ? (
                        <Badge variant="success">Правда</Badge>
                      ) : (
                        <Badge variant="error">Ложь</Badge>
                      )}
                    </td>
                    <td>
                      <UpdateSubject subject={subject} />
                      <DeleteSubject subjectId={subject.id} />
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
