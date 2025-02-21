import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request, { baseURL }  from "@/services/apiClient";
import Cookies from 'js-cookie';
import { Ingredient } from "./types";
import { ApiResponse } from ".";


export async function getAllIngredients(pageIndex: number, pageSize: number): Promise<ApiResponse<Ingredient[]>> {
  const response = await request.get(
    `${baseURL}/api/ingredients?pageIndex=${pageIndex}&pageSize=${pageSize}`
  );
  return response as ApiResponse<Ingredient[]>; 
}

export async function getIngredientById(ingredientId: number): Promise<ApiResponse<Ingredient>> {
  return await request.get(`${baseURL}/api/ingredients/${ingredientId}`);
}

export async function createIngredient(
  formData: { ingredientName: string; category: string; unit: string; calories: number }
): Promise<Ingredient> {
  try {
    const token = Cookies.get("authToken"); // Lấy token từ Cookies
    if (!token) throw new Error("Bạn chưa đăng nhập!");

    const form = new FormData();
    form.append("ingredientName", formData.ingredientName);
    form.append("category", formData.category);
    form.append("unit", formData.unit);
    form.append("calories", formData.calories.toString());

    const response = await request.postMultiPart(`${baseURL}/api/ingredients`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Lỗi khi tạo ingredient:", error);
    throw error;
  }
}

export async function updateIngredient(
  ingredientId: number,
  formData: { ingredientName: string; category: string; unit:string, calories:number}, 
  token: string
): Promise<Ingredient> {
  try {
    const token = Cookies.get("authToken"); // Lấy token từ Cookies
    if (!token) throw new Error("Bạn chưa đăng nhập!");
    const form = new FormData();
    form.append("ingredientName", formData.ingredientName);
    form.append("category", formData.category);
    form.append("unit", formData.unit);
    form.append("calories", formData.calories.toString());

    const response = await request.putMultiPart(
      `${baseURL}/api/ingredients?ingredientId=${ingredientId}`,
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }
    );
    
    return response;
  } catch (error) {
    console.error('Error updating allergy:', error);
    throw error;
  }
}

export async function deleteIngredientById(ingredientId: number): Promise<void> {
  try {
    const token = Cookies.get("authToken"); // Lấy token từ Cookies
    if (!token) throw new Error("Bạn chưa đăng nhập!");

    await request.deleteWithOptions(`${baseURL}/api/ingredients/${ingredientId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Lỗi khi xóa ingredient:", error);
    throw error;
  }
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
