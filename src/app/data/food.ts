import { useGetAllServingSize } from './../../../.history/src/app/data/ingredient_20250412111519';
import { message } from 'antd';

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request, { baseURL } from "@/services/apiClient";
import { Food, ServingSize } from "./types";
import { ApiResponse } from ".";


export async function getAllServingSizes(pageIndex:number,pageSize:number): Promise<ApiResponse<ServingSize[]>> {
  return await request.get(`${baseURL}/api/serving-size?pageIndex=${pageIndex}&pageSize=${pageSize}`);
}
export async function getServingSizeById(servingSizeId: number): Promise<ApiResponse<ServingSize>> {
  return await request.get(`${baseURL}/api/serving-size/${servingSizeId}`);
}
export async function getAllFoods(pageIndex: number, pageSize: number): Promise<ApiResponse<Food[]>> {
  return await request.get(`${baseURL}/api/food?pageIndex=${pageIndex}&pageSize=${pageSize}`);
}


export async function getFoodById(foodId: number): Promise<ApiResponse<Food>> {
  return await request.get(`${baseURL}/api/food/${foodId}`);
}
// export async function createFoodIngredient(
//   foodId: number, // Add foodId parameter
//   formData: { 
//     ingredientId: number;
//     quantity: number;
//     unit: string; // Change `unit` type to string
//   }
// ): Promise<Food> {
//   const data = {
//     ingredientId: formData.ingredientId,
//     quantity: formData.quantity,
//     unit: formData.unit, // Ensure unit is a string
//   };

//   const response = await request.post(`${baseURL}/api/food-ingredient/${foodId}`, data, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   return response;
// }

// POST request to upload an Excel file
// export async function importFoodExcelFile(formData: FormData): Promise<{ message: string }> {
//   try {
//     // Make the request to the backend and return the response data
//     const response = await request.postMultiPart(`${baseURL}/api/food/excel`, formData);
//     console.log("Response Data:", response.data);
//     // Assuming the response contains a message like { message: 'Import successful' }
//     return response.data; // Assuming the response structure is { data: { message: string } }

//   } 
//   catch (error) {
//     // Handle errors if any
//     throw new Error('Error importing Excel file');
//   }
// }
// export async function importFoodExcelFile(formData: FormData): Promise<{ message: string }> {
//   try {
//     // Make the request to the backend and get the response
//     const response = await request.postMultiPart(`${baseURL}/api/food/excel`, formData);

//     // Log the full response to inspect its structure
//     console.log("Full Response:", response);

//     // Access the message directly from the response (it's at the top level)
//     const message = response?.message;

//     // Log the message to the console
//     console.log("Response Message:", message);

//     // Return the message from the API response
//     return { message };
//   } catch (error) {
//     // Handle errors if any
//     console.error("Error importing Excel file:", error);
//     throw new Error('Error importing Excel file');
//   }
// }
export async function importFoodExcelAnalyzeFile(formData: FormData): Promise<{ message: string ,data:any}> {
  try {
    const response = await request.postMultiPart(`${baseURL}/api/food/excel-analyze`, formData);
    console.log("Full Response:", response);
    const message = response?.message;
    const data = response?.data;
    console.log("Response Message:", message);
    return { message,data  };
  } catch (error) {
    console.error("Error importing Excel file:", error);
    throw new Error('Error importing Excel file');
  }
}
export async function importFoodExcelFile(formData: FormData): Promise<{ message: string }> {
  try {
    const response = await request.postMultiPart(`${baseURL}/api/food/excel`, formData);
    const message = response?.message;
    console.log("Response ,ess:", response.message);
    return { message };
  } catch (error) {
    console.error("Error importing Excel file:", error);
    throw new Error('Error importing Excel file');
  }
}
// Function to add new items and overwrite duplicates
export async function importFoodExcelDuplicateFile(formData: FormData): Promise<{ message: string }> {
  try {
    const response = await request.postMultiPart(`${baseURL}/api/food/excel-duplicate`, formData);
    const message = response?.message;
    console.log("Response Data:", response.data);
    return { message };
  } catch (error) {
    console.error("Error importing Excel file:", error);
    throw new Error('Error importing Excel file');
  }
}
// export async function createFood(
//   formData: {
//     FoodName: string;
//     MealType: string;
//     FoodImageUrl: string | File;
//     FoodType: string;
//     Description: string;
//     FoodServingSizes: { // Định nghĩa mảng foodServingSizes
//       servingSizeId: number;
//       quantity: number;
//       calories: number;
//       protein: number;
//       carbs: number;
//       fat: number;
//       glucid: number;
//       fiber: number;
//     }[];
//     AllergyId: string[];
//     DiseaseId: string[];
//     Ingredients: string[];
//   }
// ): Promise<Food> {
//   const form = new FormData();
//   form.append("FoodName", formData.FoodName);
//   form.append("MealType", formData.MealType);
//   form.append("FoodType", formData.FoodType);
//   form.append("Description", formData.Description);

//   // Cập nhật các khẩu phần dinh dưỡng
//   if (formData.FoodServingSizes) {
//     formData.FoodServingSizes.forEach((size) => {
//       form.append("FoodServingSizes[]", JSON.stringify({
//         servingSizeId: size.servingSizeId,
//         quantity: size.quantity,
//         calories: size.calories,
//         protein: size.protein,
//         carbs: size.carbs,
//         fat: size.fat,
//         glucid: size.glucid,
//         fiber: size.fiber,
//       }));
//     });
//   }

//   // Cập nhật các trường dinh dưỡng khác
//   // form.append("Calories", formData.Calories.toString());
//   // form.append("Protein", formData.Protein.toString());
//   // form.append("Carbs", formData.Carbs.toString());
//   // form.append("Fat", formData.Fat.toString());
//   // form.append("Glucid", formData.Glucid.toString());
//   // form.append("Fiber", formData.Fiber.toString());
//   // form.append("Others", formData.Others);

//   // Cập nhật hình ảnh nếu có
//   if (formData.FoodImageUrl) {
//     form.append("FoodImageUrl", formData.FoodImageUrl);
//   }

//   // Cập nhật các nguyên liệu
//   formData.Ingredients.forEach((id) => form.append("Ingredients", id));

//   // Gửi dữ liệu qua API
//   return await request.postMultiPart(`${baseURL}/api/food`, form);
// }


// export async function updateFood(formData: {
//   FoodId: number;
//   FoodName?: string;
//   MealType?: string;
//   FoodImageUrl?: string | File;
//   FoodType?: string;
//   Description?: string;
//   FoodServingSizes?: {
//     servingSizeId: number;
//     quantity: number;
//     calories: number;
//     protein: number;
//     carbs: number;
//     fat: number;
//     glucid: number;
//     fiber: number;
//   }[];  // Sửa lại kiểu foodServingSizes để có thể nhận mảng các khẩu phần
//   Ingredients?: string[];
// }): Promise<Food> {
//   if (!formData.FoodId) {
//     throw new Error("FoodId không hợp lệ!");
//   }

//   const oldDataResponse = await getFoodById(formData.FoodId);
//   const oldData = oldDataResponse.data;

//   const form = new FormData();
//   form.append("FoodId", formData.FoodId.toString());
//   form.append("FoodName", formData.FoodName ?? oldData.foodName);
//   form.append("MealType", formData.MealType ?? oldData.mealType);
//   form.append("FoodType", formData.FoodType ?? oldData.foodType);
//   form.append("Description", formData.Description ?? oldData.description);

//   // Cập nhật mảng foodServingSizes
//   if (formData.FoodServingSizes) {
//     formData.FoodServingSizes.forEach((size) => {
//       form.append("FoodServingSizes[]", JSON.stringify({
//         servingSizeId: size.servingSizeId,
//         quantity: size.quantity,
//         calories: size.calories,
//         protein: size.protein,
//         carbs: size.carbs,
//         fat: size.fat,
//         glucid: size.glucid,
//         fiber: size.fiber,
//       }));
//     });
//   }

//   if (formData.FoodImageUrl instanceof File) {
//     form.append("FoodImageUrl", formData.FoodImageUrl);
//   } else if (formData.FoodImageUrl === "") {
//     form.append("FoodImageUrl", ""); // Nếu ảnh bị xóa
//   } else {
//     form.append("FoodImageUrl", oldData.imageUrl ?? "");
//   }

//   // Cập nhật nguyên liệu
//   if (formData.Ingredients) {
//     formData.Ingredients.forEach((id) => form.append("Ingredients", id));
//   } else {
//     oldData.ingredients.forEach((id) => form.append("Ingredients", id.toString()));
//   }

//   return await request.putMultiPart(`${baseURL}/api/food/${formData.FoodId}`, form);
// }
export async function createFood(
  formData: {
    foodName: string;
    mealType: string;
    foodType: string;
    foodImageUrl: string | File;
    imageUrl: string;
    description: string;
    foodServingSizes: {
      servingSizeId: number;
      quantity: number;
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
      glucid: number;
      fiber: number;
    }[];
    // AllergyId: string[];
    // DiseaseId: string[];
    ingredients: string[];
  }
): Promise<Food> {
  const foodData = {
    foodName: formData.foodName,
    mealType: formData.mealType,
    foodType: formData.foodType,
    description: formData.description,
    foodServingSizes: formData.foodServingSizes.map((size) => ({
      servingSizeId: size.servingSizeId,
      quantity: size.quantity,
      calories: size.calories,
      protein: size.protein,
      carbs: size.carbs,
      fat: size.fat,
      glucid: size.glucid,
      fiber: size.fiber,
    })),
    // AllergyId: formData.AllergyId,
    // DiseaseId: formData.DiseaseId,
    ingredients: formData.ingredients,
  };

  // Nếu FoodImageUrl là File, chuyển sang Base64 (nếu cần)
  // if (formData.FoodImageUrl instanceof File) {
  //   const reader = new FileReader();
  //   return new Promise((resolve, reject) => {
  //     reader.onloadend = async () => {
  //       const base64Image = reader.result as string;
  //       const requestData = { ...foodData, FoodImageUrl: base64Image };
  //       try {
  //         const response = await request.post(`${baseURL}/api/food`, {
  //           body: JSON.stringify(requestData),
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         });
  //         resolve(response);
  //       } catch (error) {
  //         reject(error);
  //       }
  //     };
  //     reader.readAsDataURL(formData.FoodImageUrl); // Chuyển file thành Base64
  //   });
  // } else {
  //   // Nếu không có ảnh, chỉ gửi đường dẫn
  const response = await request.post(`${baseURL}/api/food`, foodData, {
    headers: {
   
      'Content-Type': 'application/json',
    },
  });

  return response;
  }
// }
export async function updateFood(
  foodId: number,
  formData: {
  foodId: number;
  foodName?: string;
  mealType?: string;
  // foodImageUrl?: string; // Hình ảnh là một chuỗi (URL hoặc Base64)
  foodType?: string;
  description?: string;
  foodServingSizes?: {
    servingSizeId: number;
    quantity: number;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    glucid: number;
    fiber: number;
  }[];
  ingredients?: string[];
}): Promise<Food> {
  // if (!formData.foodId) {
  //   throw new Error("FoodId không hợp lệ!");
  // }



  const foodData = {
    
    foodName: formData.foodName ,
    mealType: formData.mealType ,
    foodType: formData.foodType ,
    description: formData.description,
    foodServingSizes: formData.foodServingSizes
      ? formData.foodServingSizes.map((size) => ({
          servingSizeId: size.servingSizeId,
          quantity: size.quantity,
          calories: size.calories,
          protein: size.protein,
          carbs: size.carbs,
          fat: size.fat,
          glucid: size.glucid,
          fiber: size.fiber,
        })):[],
      
    ingredients: formData.ingredients ,
    // foodImageUrl: formData.FoodImageUrl ?? oldData.imageUrl, // Hình ảnh là chuỗi (URL hoặc Base64)
  };

  const response =await request.put(`${baseURL}/api/food/${foodId}`,foodData, {

    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}


export async function deleteFoodById(foodId: number): Promise<void> {
  await request.delete(`${baseURL}/api/food/${foodId}`);
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

export const useGetAllServingSizes = (
  pageIndex: number,
  pageSize: number,

  config?: UseQueryOptions<ServingSize[]>
) => {
  return useQuery<ServingSize[]>({
    queryKey: ["servingSizes", pageIndex, pageSize],
    queryFn: async () => {
      const response = await getAllServingSizes(pageIndex, pageSize);
      return response.data;
    },
    ...config,
  });
};
// 🔎 Hook lấy thực phẩm theo ID
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