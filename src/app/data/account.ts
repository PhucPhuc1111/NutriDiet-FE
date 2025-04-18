import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request, { baseURL } from "@/services/apiClient";

import { Account, Allergy, Dashboard, Revenue, Transaction } from "./types";
import { ApiResponse } from ".";

import Cookies from "js-cookie";
import { Select } from "antd";


export async function getAllAccounts(
  pageIndex: number,
  pageSize: number
): Promise<ApiResponse<Account[]>> {
  return await request.get(`${baseURL}/api/user?pageIndex=${pageIndex}&pageSize=${pageSize}`);
}
export async function updateStatus(userId: number, status: string): Promise<ApiResponse<any>> {
  try {
    // Gọi API để cập nhật trạng thái người dùng
    const response = await request.put(`${baseURL}/api/user/status/${userId}/${status}`);
    return response.data;
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
}
export async function updateChangeRole(userId: number, role: string): Promise<ApiResponse<any>> {
  try {
    // Gọi API để cập nhật trạng thái người dùng
    const response = await request.put(`${baseURL}/api/user/role/${userId}/${role}`);
    return response.data;
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
}

export async function getAllDashboard(

): Promise<ApiResponse<Dashboard>> {
  return await request.get(`${baseURL}/api/dashboard`);
}
export async function getAllTransactions(
  pageIndex: number,
  pageSize: number
): Promise<ApiResponse<Transaction[]>> {
  return await request.get(`${baseURL}/api/dashboard/transaction?pageIndex=${pageIndex}&pageSize=${pageSize}`);
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
export const useGetAllTransactions = (
  pageIndex: number,
  pageSize: number,
  fullName: string,
  config?: UseQueryOptions<Transaction[]>
) => {
  return useQuery<Transaction[]>({
    queryKey: ["transactions", pageIndex, pageSize],
    queryFn: async (): Promise<Transaction[]> => {
      const response = await getAllTransactions(pageIndex, pageSize); // Không cần truyền token
      return response.data;
    },
    ...config,
  });
};
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
export async function getAllRevenue(): Promise<ApiResponse<Revenue>> {
  return await request.get(`${baseURL}/api/dashboard/revenue`); // Không cần pageIndex và pageSize
}


export const useGetAllRevenue = (
  config?: UseQueryOptions<Revenue>
) => {
  return useQuery<Revenue>({
    queryKey: ["revenue"], // Không cần pageIndex và pageSize
    queryFn: async (): Promise<Revenue> => {
      const response = await getAllRevenue(); // Gọi API không cần truyền tham số phân trang
      return response.data;
    },
    ...config,
  });
};
