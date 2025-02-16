import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request  from "@/services/apiClient";
import baseURL from "@/services/apiClient";
import { Allergy } from "./types";

export async function getAllAllergies(pageIndex: number, pageSize: number, search: string): Promise<Allergy[]> {
  return await request.get(`${baseURL}/api/food?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${search}`);
}

export async function getAllergyById(id: string): Promise<Allergy> {
  return await request.get(`${baseURL}/api/food/${id}`);
}

export async function updateFood(id: string, formData: FormData, token: string) {
  try {
  
    const response = await request.putMultiPart(`${baseURL}/api/food/${id}`, formData, {
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
  return await request.deleteWithOptions(`${baseURL}/api/food/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });
}

export const useGetAllFoods = (
  pageIndex: number,
  pageSize: number,
  search: string,
  config?: UseQueryOptions<Allergy[]>
) => {
  return useQuery({
    queryKey: ["products", pageIndex, pageSize, search],
    queryFn: () => getAllAllergies(pageIndex, pageSize, search),
    ...config,
  });
}
