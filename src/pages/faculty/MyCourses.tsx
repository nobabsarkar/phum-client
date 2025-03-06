import { useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/facultyCourses.api";

const MyCourses = () => {
  const { data } = useGetAllFacultyCoursesQuery(undefined);
  console.log(data);

  return (
    <div>
      <h1>This is MyCourses component</h1>
    </div>
  );
};

export default MyCourses;
