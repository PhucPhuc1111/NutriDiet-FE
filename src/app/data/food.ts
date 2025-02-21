import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request, { baseURL }  from "@/services/apiClient";

import { Food } from "./types";
import { ApiResponse } from ".";
import Cookies from 'js-cookie';


export async function getAllFoods(pageIndex: number, pageSize: number): Promise<ApiResponse<Food[]>> {
  const response = await request.get(
    `${baseURL}/api/food?pageIndex=${pageIndex}&pageSize=${pageSize}`
  );
  return response as ApiResponse<Food[]>; 
}

export async function getFoodById(foodId: string): Promise<ApiResponse<Food>> {
  return await request.get(`${baseURL}/api/food/${foodId}`);
}


export async function createFood(
  formData: {
    Protein: any;
    Calories: any; 
    FoodName: string; 
    MealType: string; 
    FoodImageUrl: string;
    FoodType: string;
    Description: string;
    ServingSize: string;
    Carbs: any;
    Fat: any;
    Glucid: any;
    Fiber: any;
    Others: any;
  },
  token: string
): Promise<Food> {
  try {
    const token = Cookies.get("authToken"); 
    if (!token) throw new Error("Bạn chưa đăng nhập!");
    const form = new FormData();
    form.append("FoodName", formData.FoodName);
    form.append("MealType", formData.MealType || "NULL");
    form.append("FoodImageUrl", formData.FoodImageUrl || "NULL");
    form.append("FoodType", formData.FoodType || "NULL");
    form.append("Description", formData.Description || "NULL");
    form.append("ServingSize", formData.ServingSize || "NULL");
    form.append("Calories", formData.Calories.toString() || "NULL");
    form.append("Protein", formData.Protein.toString() || "NULL");
    form.append("Carbs", formData.Carbs.toString() || "NULL");
    form.append("Fat", formData.Fat.toString() || "NULL");
    form.append("Glucid", formData.Glucid.toString() || "NULL");
    form.append("Fiber", formData.Fiber.toString() || "NULL");
    form.append("Others", formData.Others || "NULL");
 
    const response = await request.postMultiPart(`${baseURL}/api/disease`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error creating disease:", error);
    throw error;
  }
}

export async function updateFood(foodId: string, formData: FormData, token: string) {
  try {
  
    const response = await request.putMultiPart(`${baseURL}/api/food/${foodId}`, formData, {
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

export async function deleteFoodById(foodId: string, token: string): Promise<void> {
  return await request.deleteWithOptions(`${baseURL}/api/food/${foodId}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });
}
export const useGetAllFoods = (
  pageIndex: number,
  pageSize: number,
foodName: string,
  config?: UseQueryOptions<Food[]>
) => {
  return useQuery<Food[]>({
    queryKey: ["foods", pageIndex, pageSize],
    queryFn: async () => {
      const response = await getAllFoods(pageIndex, pageSize);
      return response.data;
    },
    ...config,
  });
};
