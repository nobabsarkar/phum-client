/* eslint-disable @typescript-eslint/no-explicit-any */
import { TResponseRedux } from "../../../constants";
import { TQueryParam } from "../../../types";
import { TOfferedCourse } from "../../../types/studentCourse.type";
import { baseApi } from "../../api/baseApi";

const studentCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOfferedCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/offered-courses/my-offered-courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["offeredCourse"],
      transformResponse: (response: TResponseRedux<TOfferedCourse>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    enrolCourse: builder.mutation({
      query: (data) => ({
        url: "/enrolled-course/create-enrolled-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["offeredCourse"],
    }),
  }),
});

export const { useGetAllOfferedCoursesQuery, useEnrolCourseMutation } =
  studentCourseApi;
