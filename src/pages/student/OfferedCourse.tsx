/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Row } from "antd";
import {
  useEnrolCourseMutation,
  useGetAllOfferedCoursesQuery,
} from "../../redux/features/student/studentCourseManagement.api";
import { TOfferedCourse } from "../../types/studentCourse.type";

type TCourse = {
  [index: string]: any;
};

// offered course component
const OfferedCourse = () => {
  const { data: offeredCourseData } = useGetAllOfferedCoursesQuery(undefined);
  const [enroll] = useEnrolCourseMutation();

  // const singleObject = offeredCourseData?.data?.reduce(
  //   (acc: TCourse, item: TCourse) => {
  //     const key = item?.course.title;

  //     acc[key] = acc[key] || { courseTitle: key, sections: [] };

  //     acc[key].sections.push({
  //       section: item.section,
  //       _id: item?._id,
  //       days: item.days,
  //       startTime: item.startTime,
  //       endTime: item.endTime,
  //     });

  //     return acc;
  //   },
  //   {}
  // );

  const singleObject = (
    offeredCourseData?.data as unknown as TOfferedCourse[]
  )?.reduce((acc: TCourse, item: TOfferedCourse) => {
    const key = item?.course.title;

    acc[key] = acc[key] || { courseTitle: key, sections: [] };

    acc[key].sections.push({
      section: item.section,
      _id: item._id,
      days: item.days,
      startTime: item.startTime,
      endTime: item.endTime,
    });

    return acc;
  }, {});

  const modifiedData = Object.values(singleObject ? singleObject : {});

  const handleEnroll = async (id: any) => {
    const enrollData = {
      offeredCourse: id,
    };

    const res = await enroll(enrollData);
    console.log(res);
  };

  if (!modifiedData.length) {
    return (
      <p
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "25px",
          color: "red",
          alignItems: "center",
        }}
      >
        No Available Courses
      </p>
    );
  }

  return (
    <Row gutter={[0, 20]}>
      {modifiedData?.map((item: any) => {
        return (
          <Col span={24} style={{ border: "solid #d4d4d4 2px" }}>
            <div style={{ padding: "10px" }}>
              <h2>{item?.courseTitle}</h2>
            </div>
            <div>
              {item.sections.map((section: any) => {
                return (
                  <Row
                    justify="space-between"
                    align="middle"
                    style={{ borderTop: "solid #d4d4d4 2px", padding: "10px" }}
                  >
                    <Col span={5}>Section: {section.section}</Col>
                    <Col span={5}>
                      Days:
                      {section.days.map((day: any) => (
                        <span> {day},</span>
                      ))}
                    </Col>
                    <Col span={5}>Start Time: {section.startTime}</Col>
                    <Col span={5}>End Time: {section.endTime}</Col>

                    <Button onClick={() => handleEnroll(section._id)}>
                      Enroll
                    </Button>
                  </Row>
                );
              })}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default OfferedCourse;
