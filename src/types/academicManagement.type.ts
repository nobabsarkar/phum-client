export type TAcademicSemester = {
  _id: string;
  name: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
  fullName: string;
  email: string;
  contactNo: string;
  academicFaculty: TAcademicFaculty;
};

export type TAcademicDepartment = {
  _id: string;
  name: string;
  academicFaculty: TAcademicFaculty;
  createdAt: string;
  updatedAt: string;
};

export type TAcademicFaculty = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
