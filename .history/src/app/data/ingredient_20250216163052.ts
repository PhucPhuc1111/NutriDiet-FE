
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request  from "@/services/apiClient";
import baseURL from "@/services/apiClient";
import { Imgredient } from "./types";

export async function getAllIngredients(pageIndex: number, pageSize: number, search: string): Promise<Imgredient[]> {
  return await request.get(`${baseURL}/api/Imgredient?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${search}`);
}

export async function getImgredientById(id: string): Promise<Imgredient> {
  return await request.get(`${baseURL}/api/Imgredient/${id}`);
}

export async function updateFood(id: string, formData: FormData, token: string) {
  try {
  
    const response = await request.putMultiPart(`${baseURL}/api/Imgredient/${id}`, formData, {
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

export async function deleteFoodById(id: string, token: string): Promise<void> {
  return await request.deleteWithOptions(`${baseURL}/api/Imgredient/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });
}

export const useGetAllProducts = (
  pageIndex: number,
  pageSize: number,
  search: string,
  config?: UseQueryOptions<Imgredient[]>
) => {
  return useQuery({
    queryKey: ["products", pageIndex, pageSize, search],
    queryFn: () => getAllProducts(pageIndex, pageSize, search),
    ...config,
  });
}
