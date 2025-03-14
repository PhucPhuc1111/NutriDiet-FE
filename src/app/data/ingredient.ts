import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request, { baseURL }  from "@/services/apiClient";
import Cookies from 'js-cookie';
import { Ingredient } from "./types";
import { ApiResponse } from ".";


export async function getAllIngredients(pageIndex: number, pageSize: number): Promise<ApiResponse<Ingredient[]>> {
  return await request.get(`${baseURL}/api/ingredient?pageIndex=${pageIndex}&pageSize=${pageSize}`);
}


export async function getIngredientById(ingredientId: number): Promise<ApiResponse<Ingredient>> {
  return await request.get(`${baseURL}/api/ingredient/${ingredientId}`);
}

export async function createIngredient(
  formData: { 
    ingredientName: string;
     carbs: number; 
     fat: number; 
     protein: number;
      calories: number }
): Promise<Ingredient> {
 
    const data = {
      ingredientName: formData.ingredientName,
      carbs: formData.carbs,
      fat: formData.fat,
      protein: formData.protein,
      calories: formData.calories,
    };

    const response = await request.post(`${baseURL}/api/ingredient`, data, {
      headers: {
     
        'Content-Type': 'application/json',
      },
    });

    return response;

}

export async function updateIngredient(
  ingredientId: number,
  formData: { 
    ingredientName: string;
    carbs: number; 
    fat: number; 
    protein: number; 
    calories: number;
  }
): Promise<Ingredient> {
  const data = {
    ingredientName: formData.ingredientName,
    carbs: formData.carbs,
    fat: formData.fat,
    protein: formData.protein,
    calories: formData.calories,
  };

  const response = await request.put(`${baseURL}/api/ingredient/${ingredientId}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
}


export async function deleteIngredientById(ingredientId: number): Promise<void> {


    await request.deleteWithOptions(`${baseURL}/api/ingredient/${ingredientId}`, {
      
    });
  
}

export const useGetAllIngredients = (
  pageIndex: number,
  pageSize: number,
  ingredientName: string,
  config?: UseQueryOptions<Ingredient[]>
) => {
  return useQuery<Ingredient[]>({
    queryKey: ["ingredients", pageIndex, pageSize],
    queryFn: async () => {
      const response = await getAllIngredients(pageIndex, pageSize);
      return response.data;
    },
    ...config,
  });
};
export const useGetIngredientById = (ingredientId: number, config?: UseQueryOptions<Ingredient>) => {
  return useQuery<Ingredient>({
    queryKey: ["ingredient", ingredientId],
    queryFn: async () => {
      const response = await getIngredientById(ingredientId);
      return response.data;
    },
    enabled: !!ingredientId, // Chỉ gọi API khi có foodId
    ...config,
  });
};