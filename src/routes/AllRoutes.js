import { Routes, Route } from "react-router-dom";
// import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../pages/login/Login";
import HomePage from "../pages/Base/HomePage";
import ContactPage from "../pages/Base/ContactPage";
import AboutPage from "../pages/Base/AboutPage";
import PricingPage from "../pages/Base/PricingPage";
import ServicesPage from "../pages/Base/ServicesPage";
import Registration from "../pages/registration/Registration";
import ClassroomPage from "../pages/Classroom/ClassroomPage";
import ClassroomDetail from "../pages/Classroom/ClassroomDetail";
import ClassroomAddPage from "../pages/Classroom/ClassroomAddPage";
import ClassroomEdit from "../pages/Classroom/ClassroomEdit";
import ClassroomDelete from "../pages/Classroom/ClassroomDelete";
import StudentAddPage from "../pages/Student/StudentAddPage";
import StudentDetailPage from "../pages/Student/StudentDetailPage";
import StudentEditPage from "../pages/Student/StudentEditPage";
import StudentDeletePage from "../pages/Student/StudentDeletePage";
import SubjectAdd from "../pages/academics/SubjectAdd";
import SubjectDelete from "../pages/academics/SubjectDelete";
import SubjectScoreEdit from "../pages/academics/SubjectScoreEdit";
import GradingScheme from "../pages/academics/GradingScheme";
import GradingSchemeAdd from "../pages/academics/GradingSchemeAdd";
import GradingSchemeEdit from "../pages/academics/GradingSchemeEdit";
import ClassroomResult from "../pages/Classroom/ClassroomResult";
import ClassroomResultSimplified from "../pages/Classroom/ClassroomResultSimplified";
import { ProtectedRoute } from "./ProtectedRoutes";
import { PageNotFound } from "../pages/PageNotFound";

export default function AllRoutes() {
  return (
    <>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />

        <Route path="/classroom-details/:id" element={<ProtectedRoute><ClassroomDetail /></ProtectedRoute>} />
        <Route path="/create-new-class" element={<ProtectedRoute><ClassroomAddPage /></ProtectedRoute>} />
        <Route path="/edit-classroom/:id" element={<ProtectedRoute><ClassroomEdit /></ProtectedRoute>} />
        <Route path="/delete-classroom/:id" element={<ProtectedRoute><ClassroomDelete /></ProtectedRoute>} />
        <Route path="/classroom" element={<ProtectedRoute><ClassroomPage /></ProtectedRoute>} />
        <Route path="/add-student/:id" element={<ProtectedRoute><StudentAddPage /></ProtectedRoute>} />
        <Route path="/student-details/:id" element={<ProtectedRoute><StudentDetailPage /></ProtectedRoute>} />
        <Route path="/edit-student/:id" element={<ProtectedRoute><StudentEditPage /></ProtectedRoute>} />
        <Route path="/delete-student/:id" element={<ProtectedRoute><StudentDeletePage /></ProtectedRoute>} />
        <Route path="/add-subject/:id" element={<ProtectedRoute><SubjectAdd /></ProtectedRoute>} />
        <Route path="/delete-subject/:id" element={<ProtectedRoute><SubjectDelete /></ProtectedRoute>} />
        <Route path="/edit-subject-score/:id" element={<ProtectedRoute><SubjectScoreEdit /></ProtectedRoute>} />
        <Route path="/grading-scheme/:id" element={<ProtectedRoute><GradingScheme /></ProtectedRoute>} />
        <Route path="/add-grading-scheme/:id" element={<ProtectedRoute><GradingSchemeAdd /></ProtectedRoute>} />
        <Route path="/edit-grading-scheme/:id" element={<ProtectedRoute><GradingSchemeEdit /></ProtectedRoute>} />
        <Route path="/class-results/:id" element={<ProtectedRoute><ClassroomResult /></ProtectedRoute>} />
        <Route path="/simplified-result/:id" element={<ProtectedRoute><ClassroomResultSimplified /></ProtectedRoute>} />

        <Route path="*" element={<PageNotFound />} />
    </Routes>
    </>
  )
}
