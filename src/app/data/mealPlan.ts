import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request, { baseURL }  from "@/services/apiClient";
import Cookies from 'js-cookie';
import { MealPlan } from "./types";
import { ApiResponse } from ".";
import {CreateMealPlanParams} from "./types";

export async function getAllMealPlans(pageIndex: number, pageSize: number): Promise<ApiResponse<MealPlan[]>> {
  return await request.get(`${baseURL}/api/meal-plan?pageIndex=${pageIndex}&pageSize=${pageSize}`);
}


export async function getMealPlanById(mealplanId: number): Promise<ApiResponse<MealPlan>> {
  return await request.get(`${baseURL}/api/meal-plan/${mealplanId}`);
}


export const createMealPlan = async (params: CreateMealPlanParams) => {
  const token = Cookies.get("accessToken");

  if (!token) {
    throw new Error("Bạn chưa đăng nhập!");
  }

  try {
    const response = await request.post(`${baseURL}/api/meal-plan`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Lỗi khi tạo thực đơn:", error);
    throw error;
  }
};


export const updateMealPlan = async (id: number, params: CreateMealPlanParams) => {
  const token = Cookies.get("accessToken");

  if (!token) {
    throw new Error("Bạn chưa đăng nhập!");
  }

  try {
    const response = await request.put(`${baseURL}/api/meal-plan/${id}`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Lỗi khi cập nhật thực đơn:", error);
    throw error;
  }
};


export async function deleteMealPlanById(mealPlanId: number): Promise<void> {
  await request.delete(`${baseURL}/api/meal-plan/${mealPlanId}`);
}

export const useGetAllMealPlans = (
  pageIndex: number,
  pageSize: number,
  search: string,
  config?: UseQueryOptions<MealPlan[]>
) => {
  return useQuery<MealPlan[]>({
     queryKey: ["mealplans", pageIndex, pageSize],
     queryFn: async () => {
       const response = await getAllMealPlans(pageIndex, pageSize);
       return response.data;
     },
     ...config,
   });
 };
export const useGetMealPlanById = (mealPlanId: number, config?: UseQueryOptions<MealPlan>) => {
  return useQuery<MealPlan>({
    queryKey: ["mealPlan", mealPlanId],
    queryFn: async () => {
      const response = await getMealPlanById(mealPlanId);
      console.log("Meal Plan by ID:", response);
      return response.data;
    },
    enabled: !!mealPlanId,
    ...config,
  });
};
