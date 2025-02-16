
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request  from "@/services/apiClient";
import baseURL from "@/services/apiClient";
import { Ingredient } from "./types";

export async function getAllIngredients(pageIndex: number, pageSize: number, search: string): Promise<Ingredient[]> {
  return await request.get(`${baseURL}/api/Ingredient?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${search}`);
}

export async function getIngredientById(id: string): Promise<Ingredient> {
  return await request.get(`${baseURL}/api/Ingredient/${id}`);
}

export async function updateFood(id: string, formData: FormData, token: string) {
  try {
  
    const response = await request.putMultiPart(`${baseURL}/api/Ingredient/${id}`, formData, {
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

export async function deleteIngredientById(id: string, token: string): Promise<void> {
  return await request.deleteWithOptions(`${baseURL}/api/Ingredient/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });
}

export const useGetAllIngredients = (
  pageIndex: number,
  pageSize: number,
  search: string,
  config?: UseQueryOptions<Ingredient[]>
) => {
  return useQuery({
    queryKey: ["products", pageIndex, pageSize, search],
    queryFn: () => getAllIngredients(pageIndex, pageSize, search),
    ...config,
  });
}
