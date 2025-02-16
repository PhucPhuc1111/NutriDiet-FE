import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request from "@/services/apiClient";
import baseURL from "@/services/apiClient";
import { Account } from "./types";




export async function getAllAccount(token: string, pageIndex: number, pageSize: number): Promise<Account[]> {
  return await request.get(`${baseURL}/api/Account/${pageIndex}/${pageSize}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
}
export async function getAccountById(token: string, accountId: number): Promise<Account> {
  return await request.get(`${baseURL}/api/Account/${accountId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
}
export const useGetAllAccount = (
    token: string,
    pageIndex: number,
    pageSize: number,
    config?: UseQueryOptions<Account[]>) => {
    return useQuery({
      queryKey: ['account', token, pageIndex, pageSize],
      queryFn: () => getAllAccount(token, pageIndex, pageSize),
      enabled: !!token,
      ...config,
    })
  }
// export async function getDashboardData(token: string, filter: string = 'Day'): Promise<DashboardResponse> {
//   return await request.get(`${baseURL}/api/Admin/dashboard?filter=${filter}`, {
//     headers: {
//       'Authorization': `Bearer ${token}`,
//     },
//   });
// }
// export const useGetDashboardData = (
//   token: string,
//   filter: string = 'Day',
//   config?: UseQueryOptions<DashboardResponse>
// ) => {
//   return useQuery({
//     queryKey: ['dashboard', token, filter],
//     queryFn: () => getDashboardData(token, filter),
//     enabled: !!token,
//     ...config,
//   });
// };



// export async function getMonthlyIncomeData(
//   token: string,
//   year: number
// ): Promise<MonthlyIncomeResponse[]> {
//   return await request.get(`${baseURL}/api/Admin/monthly-income?year=${year}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// }

// export const useGetMonthlyIncomeData = (
//   token: string,
//   year: number,
//   config?: UseQueryOptions<MonthlyIncomeResponse[]>
// ) => {
//   return useQuery<MonthlyIncomeResponse[]>({
//     queryKey: ["monthlyIncome", year],
//     queryFn: () => getMonthlyIncomeData(token, year),
//     enabled: !!token,
//     ...config,
//   });
// };