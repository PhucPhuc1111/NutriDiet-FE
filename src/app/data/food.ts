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

export async function getFoodById(foodId: number): Promise<ApiResponse<Food>> {
  return await request.get(`${baseURL}/api/food/${foodId}`);
}


export async function createFood(
  formData: {
    FoodName: string;
    MealType: string;
    FoodImageUrl: string;
    FoodType: string;
    Description: string;
    ServingSize: string;
    Calories: number;
    Protein: number;
    Carbs: number;
    Fat: number;
    Glucid: number;
    Fiber: number;
    Others: string;
    AllergyId: string[]; // Cần gửi dưới dạng mảng
    DiseaseId: string[];
  }
): Promise<Food> {
  try {
    const token = Cookies.get("authToken");
    if (!token) throw new Error("Bạn chưa đăng nhập!");

    const form = new FormData();
    form.append("FoodName", formData.FoodName);
    form.append("MealType", formData.MealType);
    form.append("FoodImageUrl", formData.FoodImageUrl);
    form.append("FoodType", formData.FoodType);
    form.append("Description", formData.Description);
    form.append("ServingSize", formData.ServingSize);
    form.append("Calories", formData.Calories.toString());
    form.append("Protein", formData.Protein.toString());
    form.append("Carbs", formData.Carbs.toString());
    form.append("Fat", formData.Fat.toString());
    form.append("Glucid", formData.Glucid.toString());
    form.append("Fiber", formData.Fiber.toString());
    form.append("Others", formData.Others);

    // Gửi danh sách dị ứng & bệnh dưới dạng mảng
    formData.AllergyId.forEach(id => form.append("AllergyId[]", id));
    formData.DiseaseId.forEach(id => form.append("DiseaseId[]", id));

    const response = await request.postMultiPart(`${baseURL}/api/food`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Lỗi khi tạo thực phẩm:", error);
    throw error;
  }
}




export async function updateFood(formData: {
  FoodId: number;
  FoodName: string;
  MealType: string;
  FoodImageUrl: string | File;
  FoodType: string;
  Description: string;
  ServingSize: string;
  Calories: number;
  Protein: number;
  Carbs: number;
  Fat: number;
  Glucid: number;
  Fiber: number;
  Others: string;
  AllergyId: number[];
  DiseaseId: number[];
}): Promise<Food> {
  try {
    const token = Cookies.get("authToken");
    if (!token) throw new Error("Bạn chưa đăng nhập!");

    if (!formData.FoodId) {
      throw new Error("FoodId không được bỏ trống!");
    }

    const form = new FormData();
    form.append("FoodId", formData.FoodId.toString()); // 🔥 Chắc chắn gửi FoodId
    console.log("FoodId khi gửi API:", formData.FoodId); // Debug kiểm tra

    form.append("FoodName", formData.FoodName);
    form.append("MealType", formData.MealType);

    if (formData.FoodImageUrl instanceof File) {
      form.append("FoodImageUrl", formData.FoodImageUrl);
    } else {
      form.append("FoodImageUrl", formData.FoodImageUrl);
    }

    form.append("FoodType", formData.FoodType);
    form.append("Description", formData.Description);
    form.append("ServingSize", formData.ServingSize);
    form.append("Calories", formData.Calories.toString());
    form.append("Protein", formData.Protein.toString());
    form.append("Carbs", formData.Carbs.toString());
    form.append("Fat", formData.Fat.toString());
    form.append("Glucid", formData.Glucid.toString());
    form.append("Fiber", formData.Fiber.toString());
    form.append("Others", formData.Others);

    formData.AllergyId.forEach(id => form.append("AllergyId", id.toString()));
    formData.DiseaseId.forEach(id => form.append("DiseaseId", id.toString()));

    console.log("Dữ liệu gửi lên API:", Object.fromEntries(form)); // Debug kiểm tra dữ liệu

    const response = await request.putMultiPart(`${baseURL}/api/food`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("API Response:", response); // Debug kiểm tra phản hồi API
    return response;
  } catch (error) {
    console.error("Lỗi khi cập nhật thực phẩm:", error);
    throw error;
  }
}



export async function deleteFoodById(foodId: number): Promise<void> {
  try {
    const token = Cookies.get("authToken"); 
    if (!token) throw new Error("Bạn chưa đăng nhập!");

    await request.deleteWithOptions(`${baseURL}/api/food/${foodId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Lỗi khi xóa thực phẩm:", error);
    throw error;
  }
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
export const useGetFoodById = (foodId: number, config?: UseQueryOptions<Food>) => {
  return useQuery<Food>({
    queryKey: ["food", foodId],
    queryFn: async () => {
      const response = await getFoodById(foodId);
      return response.data;
    },
    enabled: !!foodId, // Chỉ gọi API khi có foodId
    ...config,
  });
};
