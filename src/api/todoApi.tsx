import { createApi } from '@reduxjs/toolkit/query/react';
import axiosInstance, { AxiosError, AxiosRequestConfig } from 'axios'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'

const axiosBaseQuery = (
  { baseUrl }: { baseUrl: string } = { baseUrl: '' }
): BaseQueryFn<
  {
    url: string
    method?: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params']
    headers?: AxiosRequestConfig['headers']
  },
  unknown,
  unknown
> =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['todo'],
  endpoints(build) {
    return {
      getTodos: build.query({
        query: () => ({ url: '/todos', method: 'get' }),
        providesTags: ['todo'],
      }),
      addTodo: build.mutation({
        query: (newTodo) => ({ url: '/todos', method: 'post', data: newTodo }),
        invalidatesTags: ['todo'],
      }),
      updateTodo: build.mutation({
        query: ({ id, updatedData }) => ({ url: `/todos/${id}`, method: 'patch', data: updatedData }),
        invalidatesTags: ['todo'],
      }),
      deleteTodo: build.mutation({
        query: (id) => ({ url: `/todos/${id}`, method: 'delete' }),
        invalidatesTags: ['todo'],
      }),
    };
  },
});


axiosInstance.interceptors.request.use(config => {
  const authToken = localStorage.getItem('token');
  if (authToken) {
    config.headers.Authorization = `${authToken}`;
  }
  console.log(config, 'config')
  return config;
});

axiosInstance.interceptors.response.use(response => {
  console.log(response, 'RESPONSE')
  return response;
});

export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation } = todoApi;

