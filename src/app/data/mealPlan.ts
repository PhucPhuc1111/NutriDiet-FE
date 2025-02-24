import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request, { baseURL }  from "@/services/apiClient";

import { MealPlan } from "./types";
import { ApiResponse } from ".";

export async function getAllMealplans(
  pageIndex: number,
  pageSize: number
): Promise<ApiResponse<MealPlan[]>> {
  const response = await request.get(
    `${baseURL}/api/meal-plan?pageIndex=${pageIndex}&pageSize=${pageSize}`
  );
  return response as ApiResponse<MealPlan[]>; 
}

export async function getMealplanById(mealplanId: number): Promise<ApiResponse<MealPlan>> {
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

export async function deleteMealPlanById(id: string, token: string): Promise<void> {
  return await request.deleteWithOptions(`${baseURL}/api/meal-plan/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });
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
       const response = await getAllMealplans(pageIndex, pageSize);
       return response.data;
     },
     ...config,
   });
 };
