import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request, { baseURL }  from "@/services/apiClient";
import Cookies from 'js-cookie';
import { MealPlan } from "./types";
import { ApiResponse } from ".";

export async function getAllMealPlans(pageIndex: number, pageSize: number): Promise<ApiResponse<MealPlan[]>> {
  return await request.get(`${baseURL}/api/meal-plan?pageIndex=${pageIndex}&pageSize=${pageSize}`);
}


export async function getMealPlanById(mealplanId: number): Promise<ApiResponse<MealPlan>> {
  return await request.get(`${baseURL}/api/meal-plan/${mealplanId}`);
}



export async function createMealPlan(formData: FormData, token: string): Promise<MealPlan> {
    try {
      const response = await request.postMultiPart(`${baseURL}/api/meal-plan`, formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });
      return response;
    } catch (error) {
      console.error("Error creating meal plan:", error);
      throw error;
    }
  }

export async function updateMealPlan(id: string, formData: FormData, token: string) {
  try {
  
    const response = await request.putMultiPart(`${baseURL}/api/meal-plan/${id}`, formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });

    
    return response;

  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

export async function deleteMealPlanById(mealPlanId: number): Promise<void> {
  try {
    const token = Cookies.get("authToken"); 
    if (!token) throw new Error("Bạn chưa đăng nhập!");

    await request.deleteWithOptions(`${baseURL}/api/meal-plan/${mealPlanId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Lỗi khi xóa thực đơn:", error);
    throw error;
  }
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
