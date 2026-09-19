import { Outlet } from 'react-router';
import { SlGraduation, SlEvent } from 'react-icons/sl';
import { LuHouse } from 'react-icons/lu';
import { IoMdBook } from 'react-icons/io';
import { GrGroup } from 'react-icons/gr';
import SidebarMenu from '@/components/generic/SidebarMenu';
import SidebarMenuButton from '@/components/generic/SidebarMenuButton';
import { IconType } from 'react-icons/lib';
import { useState } from 'react';
import Nav from '../generic/Nav';
import Footer from '../generic/Footer';

interface NavigationItem {
  id: string;
  title: string;
  icon: IconType;
  path: string;
}

const navigationItems: NavigationItem[] = [
  {
    id: 'schedule',
    title: 'Расписание',
    icon: SlEvent,
    path: '/admin/schedule',
  },
  { id: 'subjects', title: 'Предметы', icon: IoMdBook, path: '/admin/subject' },
  {
    id: 'teachers',
    title: 'Преподаватели',
    icon: SlGraduation,
    path: '/admin/teacher',
  },
  { id: 'groups', title: 'Группы', icon: GrGroup, path: '/admin/group' },
  { id: 'rooms', title: 'Аудитории', icon: LuHouse, path: '/admin/room' },
];

export default function AdminLayout() {
  const [activeItem, setActiveItem] = useState<string>('dashboard');
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      <div className="flex flex-1">
        <SidebarMenu>
          {navigationItems.map((item) => (
            <SidebarMenuButton
              path={item.path}
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              isActive={item.id === activeItem}
            >
              <item.icon />
              <span>{item.title}</span>
            </SidebarMenuButton>
          ))}
        </SidebarMenu>

        <main className="grow p-4">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
