import GroupPage from "@/pages/admin/GroupPage";
import LessonPage from "@/pages/admin/LessonPage";
import RoomPage from "@/pages/admin/RoomPage";
import SubjectPage from "@/pages/admin/SubjectPage";
import TeacherPage from "@/pages/admin/TeacherPage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import HomePage from "@/pages/HomePage";
import SchedulePage from "@/pages/schedule/SchedulePage";
import AdminLayout from "@/shared/ui/layouts/AdminLayout";
import Layout from "@/shared/ui/layouts/Layout";
import { ProtectedRoute } from "@/shared/ui/ProtectedRoute";
import { PublicOnlyRoute } from "@/shared/ui/PublicOnlyRoute";
import { Routes, Route } from "react-router";


const RoutesProvider = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route
          path="login"
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="register"
          element={
            <PublicOnlyRoute>
              <RegisterPage />
            </PublicOnlyRoute>
          }
        />
      </Route>
      <Route
        path="admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="schedule" element={<LessonPage />} />
        <Route path="subject" element={<SubjectPage />} />
        <Route path="teacher" element={<TeacherPage />} />
        <Route path="room" element={<RoomPage />} />
        <Route path="group" element={<GroupPage />} />
      </Route>
    </Routes>
  );
};

export default RoutesProvider;
