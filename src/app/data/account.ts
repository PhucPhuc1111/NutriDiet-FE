import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request, { baseURL } from "@/services/apiClient";

import { Account, Allergy } from "./types";
import { ApiResponse } from ".";

import Cookies from "js-cookie";

export async function getAllAccounts(
  pageIndex: number,
  pageSize: number
): Promise<ApiResponse<Account[]>> {
  try {
    const token = Cookies.get("authToken"); // Lấy token từ cookie
    if (!token) throw new Error("Bạn chưa đăng nhập!");

    const response = await request.get(
      `${baseURL}/api/user?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response as ApiResponse<Account[]>;
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw error;
  }
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