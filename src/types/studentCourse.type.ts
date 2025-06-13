/* eslint-disable @typescript-eslint/no-explicit-any */

export type TOfferedCourse = {
  _id: string;
  // semesterRegistration: string;
  // academicSemester: string;
  // academicFaculty: string;
  // academicDepartment: string;
  course: TCourse;
  faculty: string;
  maxCapacity: number;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  enrolledCourses: any[];
  completedCourses: any[];
  completedCourseIds: any[];
  isPreRequisitesFulFilled: boolean;
  isAlreadyEnrolled: boolean;

  semesterRegistration: { _id: string; status: string };
  academicSemester: { _id: string; name: string };
  academicFaculty: { _id: string; name: string };
  academicDepartment: { _id: string; name: string };
};

export type TCourse = {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: any[];
  isDeleted: boolean;
  __v: number;
};
