import MySchedule from "../pages/student/MySchedule";
import OfferedCourse from "../pages/student/OfferedCourse";
import StudentDashboard from "../pages/student/StudentDashboard";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard></StudentDashboard>,
  },
  {
    name: "Offered Course",
    path: "offered-course",
    element: <OfferedCourse></OfferedCourse>,
  },
  {
    name: "My Schedule",
    path: "schedule",
    element: <MySchedule></MySchedule>,
  },
];
