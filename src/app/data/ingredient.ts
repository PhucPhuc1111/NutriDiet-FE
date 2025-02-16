
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request  from "@/services/apiClient";
import {baseURL} from "@/services/apiClient";
import { Ingredient } from "./types";

export async function getAllIngredients(pageIndex: number, pageSize: number): Promise<Ingredient[]> {
  return await request.get(`${baseURL}/api/ingredients?pageIndex=${pageIndex}&pageSize=${pageSize}`);
}

export async function getIngredientById(ingredientId: string): Promise<Ingredient> {
  return await request.get(`${baseURL}/api/ingredients/${ingredientId}`);
}


export async function createIngredient(formData: FormData, token: string): Promise<Ingredient> {
    try {
      const response = await request.postMultiPart(`${baseURL}/api/ingredients`, formData, {
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


export async function updateIngredient(ingredientId: string, formData: FormData, token: string) {
  try {
  
    const response = await request.putMultiPart(`${baseURL}/api/ingredients/${ingredientId}`, formData, {
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

export async function deleteIngredientById(ingredientId: string, token: string): Promise<void> {
  return await request.deleteWithOptions(`${baseURL}/api/ingredients/${ingredientId}`, {
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
    queryKey: ["products", pageIndex, pageSize],
    queryFn: () => getAllIngredients(pageIndex, pageSize ),
    ...config,
  });
}
