
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request, { baseURL } from "@/services/apiClient";

import { Allergy } from "./types";
import { ApiResponse } from ".";



export async function getAllAllergies(
  pageIndex: number,
  pageSize: number
): Promise<ApiResponse<Allergy[]>> {
  const response = await request.get(
    `${baseURL}/api/allergy?pageIndex=${pageIndex}&pageSize=${pageSize}`
  );
  return response as ApiResponse<Allergy[]>; 
}

export async function getAllergyById(allergyId: number): Promise<ApiResponse<Allergy>> {
  return await request.get(`${baseURL}/api/allergy/${allergyId}`);
}


export async function createAllergy(
  formData: { allergyName: string; notes: string },
  token: string
): Promise<Allergy> {
  try {
    const form = new FormData();
    form.append("allergyName", formData.allergyName);
    form.append("notes", formData.notes);
 const response = await request.postMultiPart(`${baseURL}/api/allergy`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error creating allergy:", error);
    throw error;
  }
}


export async function updateAllergy(
  allergyId: number,
  formData: { allergyName: string; notes: string}, 
  token: string
): Promise<Allergy> {
  try {
    const form = new FormData();
    form.append("allergyName", formData.allergyName);
    form.append("notes", formData.notes);
 

    const response = await request.putMultiPart(
      `${baseURL}/api/allergy?allergyId=${allergyId}`,
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



export async function deleteAllergyById(allergyId: string, token: string): Promise<void> {
  try {
    await request.deleteWithOptions(`${baseURL}/api/allergy/${allergyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Error deleting allergy:", error);
    throw error;
  }
}


export const useGetAllAllergies = (
  pageIndex: number,
  pageSize: number,
  allergyName: string,
  config?: UseQueryOptions<Allergy[]>
) => {
  return useQuery<Allergy[]>({
    queryKey: ["allergies", pageIndex, pageSize],
    queryFn: async () => {
      const response = await getAllAllergies(pageIndex, pageSize);
      return response.data;
    },
    ...config,
  });
};
