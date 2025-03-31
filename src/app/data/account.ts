import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request, { baseURL } from "@/services/apiClient";

import { Account, Allergy, Dashboard } from "./types";
import { ApiResponse } from ".";

import Cookies from "js-cookie";

export async function getAllAccounts(
  pageIndex: number,
  pageSize: number
): Promise<ApiResponse<Account[]>> {
  return await request.get(`${baseURL}/api/user?pageIndex=${pageIndex}&pageSize=${pageSize}`);
}

export async function getAllDashboard(

): Promise<ApiResponse<Dashboard>> {
  return await request.get(`${baseURL}/api/dashboard`);
}


export async function getAccountById(
  token: string,
  accountId: number
): Promise<Account> {
  return await request.get(`${baseURL}/api/user/${accountId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const useGetAllAccounts = (
  pageIndex: number,
  pageSize: number,
  fullName: string,
  config?: UseQueryOptions<Account[]>
) => {
  return useQuery<Account[]>({
    queryKey: ["accounts", pageIndex, pageSize],
    queryFn: async () => {
      const response = await getAllAccounts(pageIndex, pageSize); // Không cần truyền token
      return response.data;
    },
    ...config,
  });
};