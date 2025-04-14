import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request, { baseURL }  from "@/services/apiClient";
import Cookies from 'js-cookie';
import { MealPlan } from "./types";
import { ApiResponse } from ".";
import {CreateMealPlanParams} from "./types";

export async function getAllMealPlans(pageIndex: number, pageSize: number): Promise<ApiResponse<MealPlan[]>> {
  return await request.get(`${baseURL}/api/meal-plan/sample-mealplan?pageIndex=${pageIndex}&pageSize=${pageSize}`);
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


// updateMealPlan gửi dữ liệu lên API
export const updateMealPlan = async (mealPlanId: number, params: any) => {
  try {
    const response = await request.put(`/api/meal-plan?mealPlanId=${mealPlanId}`, {
      data: {
        planName: params.planName,
        healthGoal: params.healthGoal,
        mealPlanDetails: params.mealPlanDetails,  // Các chi tiết bữa ăn phải đúng cấu trúc
      },
    });

    if (response.status === 200) {
      console.log('Meal plan updated successfully');
    }
    return response;
  } catch (error) {
    console.error('Error updating meal plan:', error);
    throw error;
  }
};


// Cập nhật chi tiết bữa ăn
export const updateMealPlanDetail = async (mealPlanDetailId: number, params: any) => {
  try {
    const response = await request.put('/api/meal-plan-detail', {
      data: {
        mealPlanDetailId,
        foodId: params.foodId,
        quantity: params.quantity,
        mealType: params.mealType,
        dayNumber: params.dayNumber,
      },
    });

    return response;
  } catch (error) {
    console.error('Error updating meal plan detail:', error);
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
