import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request, {baseURL}  from "@/services/apiClient";

import { Allergy } from "./types";
interface Response<T> {
    statusCode: number;
    message: string;
    data: T;  // data có thể là mảng các đối tượng Allergy
  }
  
export async function getAllAllergies(pageIndex: number, pageSize: number): Promise<Allergy[]> {
  return await request.get(`${baseURL}/api/allergy?pageIndex=${pageIndex}&pageSize=${pageSize}`);
}

export async function getAllergyById(allergyId: string): Promise<Allergy> {
  return await request.get(`${baseURL}/api/allergy/${allergyId}`);
}

export async function createAllergy(formData: FormData, token: string): Promise<Allergy> {
    try {
      const response = await request.postMultiPart(`${baseURL}/api/allergy`, formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });
      return response;
    } catch (error) {
      console.error("Error creating allergy:", error);
      throw error;
    }
  }

export async function updateAllergy(allergyId: string, formData: FormData, token: string) {
  try {
  
    const response = await request.putMultiPart(`${baseURL}/api/allergy/${allergyId}`, formData, {
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

export async function deleteAllergyById(allergyId: string, token: string): Promise<void> {
  return await request.deleteWithOptions(`${baseURL}/api/allergy/${allergyId}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });
}

export const useGetAllAllergies = (
  pageIndex: number,
  pageSize: number,
  allergyName: string,
  config?: UseQueryOptions<Allergy[]>
) => {
  return useQuery({
    queryKey: ["allergies", pageIndex, pageSize],
    queryFn: () => getAllAllergies(pageIndex, pageSize),
    ...config,
  });
}
