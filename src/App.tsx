import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import PaymentPage from "@/pages/PaymentPage";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import AdminDashboardPage from "@/pages/AdminDashboardPage.tsx";
import StudentManagement from "@/pages/StudentManagement.tsx";
import MentorManagement from "@/pages/MentorManagement.tsx";
import AdminLayout from "@/components/AdminLayout.tsx";
import ClassRoomManagement from "@/pages/ClassRoomManagement.tsx";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <>
                <SignedIn>
                  <DashboardPage />
                </SignedIn>
                <SignedOut>
                  <LoginPage />
                </SignedOut>
              </>
            }
          />
            <Route
                path="/admin"
                element={
                    <>
                        <SignedIn>
                            <AdminLayout />
                        </SignedIn>
                        <SignedOut>
                            <LoginPage />
                        </SignedOut>
                    </>
                }
            >
                <Route index element={<AdminDashboardPage />} />
                <Route path="students" element={<StudentManagement />} />
                <Route path="mentors" element={<MentorManagement />} />
                <Route path="classrooms" element={<ClassRoomManagement/>} />
                {/*<Route path="sessions" element={<SessionManagement />} />*/}
            </Route>
          <Route
            path="/payment/:sessionId"
            element={
              <>
                <SignedIn>
                  <PaymentPage />
                </SignedIn>
                <SignedOut>
                  <LoginPage />
                </SignedOut>
              </>
            }
          />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
