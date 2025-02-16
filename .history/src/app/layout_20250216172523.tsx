import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request from "@/services/apiClient";
import { Ingredient } from "./types";

export async function getAllIngredients(pageIndex: number, pageSize: number, search: string): Promise<Ingredient[]> {
  return await request.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ingredients?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${search}`);
}

export async function getIngredientById(id: string): Promise<Ingredient> {
  return await request.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ingredients/${id}`);
}

export async function createIngredient(formData: FormData, token: string): Promise<Ingredient> {
  try {
    const response = await request.postMultiPart(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ingredients`, formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    console.error("Error creating ingredient:", error);
    throw error;
  }
}

export async function updateIngredient(id: string, formData: FormData, token: string): Promise<Ingredient> {
  try {
    const response = await request.putMultiPart(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ingredients/${id}`, formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    console.error("Error updating ingredient:", error);
    throw error;
  }
}

export async function deleteIngredientById(id: string, token: string): Promise<void> {
  return await request.deleteWithOptions(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ingredients/${id}`, {
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
    queryKey: ["ingredients", pageIndex, pageSize, search],
    queryFn: () => getAllIngredients(pageIndex, pageSize, search),
    ...config,
  });
}