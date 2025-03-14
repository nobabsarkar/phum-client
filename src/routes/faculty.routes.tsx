import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import MyCourses from "../pages/faculty/MyCourses";
import MyStudents from "../pages/faculty/MyStudent";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard></FacultyDashboard>,
  },
  {
    name: "My Courses",
    path: "courses",
    element: <MyCourses></MyCourses>,
  },
  {
    path: "courses/:registerSemesterId/:courseId",
    element: <MyStudents></MyStudents>,
  },
];
