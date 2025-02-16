import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request  from "@/services/apiClient";
import baseURL from "@/services/apiClient";
import { MealPlan } from "./types";

export async function getAllMealPlans(pageIndex: number, pageSize: number, search: string): Promise<MealPlan[]> {
  return await request.get(`${baseURL}/api/meal-?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${search}`);
}

export async function getMealPlanById(id: string): Promise<MealPlan> {
  return await request.get(`${baseURL}/api/meal-/${id}`);
}

export async function updateMealPlan(id: string, formData: FormData, token: string) {
  try {
  
    const response = await request.putMultiPart(`${baseURL}/api/meal-/${id}`, formData, {
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
  return await request.deleteWithOptions(`${baseURL}/api/meal-/${id}`, {
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
  return useQuery({
    queryKey: ["products", pageIndex, pageSize, search],
    queryFn: () => getAllMealPlans(pageIndex, pageSize, search),
    ...config,
  });
}
