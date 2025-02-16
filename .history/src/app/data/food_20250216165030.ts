import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request  from "@/services/apiClient";
import baseURL from "@/services/apiClient";
import { Food } from "./types";

export async function getAllFoods(pageIndex: number, pageSize: number, search: string): Promise<Food[]> {
  return await request.get(`${baseURL}/api/food?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${search}`);
}

export async function getFoodById(food: string): Promise<Food> {
  return await request.get(`${baseURL}/api/food/${food}`);
}


export async function createFood(formData: FormData, token: string): Promise<Food> {
    try {
      const response = await request.postMultiPart(`${baseURL}/api/food`, formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });
      return response;
    } catch (error) {
      console.error("Error creating food:", error);
      throw error;
    }
  }
export async function updateFood(food: string, formData: FormData, token: string) {
  try {
  
    const response = await request.putMultiPart(`${baseURL}/api/food/${food}`, formData, {
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

export async function deleteFoodById(food: string, token: string): Promise<void> {
  return await request.deleteWithOptions(`${baseURL}/api/food/${food}`, {
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
  config?: UseQueryOptions<Food[]>
) => {
  return useQuery({
    queryKey: ["products", pageIndex, pageSize, search],
    queryFn: () => getAllFoods(pageIndex, pageSize, search),
    ...config,
  });
}
