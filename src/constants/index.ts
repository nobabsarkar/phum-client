import { BaseQueryApi } from "@reduxjs/toolkit/query";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TResponse<T> = {
  meta: any;
  data?: T;
  error?: TError;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;
