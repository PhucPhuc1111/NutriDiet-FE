import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request, { baseURL }  from "@/services/apiClient";

import { Disease } from "./types";
import { ApiResponse } from ".";


export async function getAllDiseases(pageIndex: number, pageSize: number): Promise<ApiResponse<Disease[]>> {
  const response = await request.get(
    `${baseURL}/api/disease?pageIndex=${pageIndex}&pageSize=${pageSize}`
  );
  return response as ApiResponse<Disease[]>; 
}

export async function getDiseaseById(diseaseId: number): Promise<ApiResponse<Disease>> {
  return await request.get(`${baseURL}/api/disease/${diseaseId}`);
}

export async function createDisease(
  formData: { diseaseName: string; description: string },
  token: string
): Promise<Disease> {
  try {
    const form = new FormData();
    form.append("diseaseName", formData.diseaseName);
    form.append("description", formData.description);
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

export async function updateDisease(
  diseaseId: number,
  formData: { diseaseName: string; description: string}, 
  token: string
): Promise<Disease> {
  try {
    const form = new FormData();
    form.append("diseaseName", formData.diseaseName);
    form.append("description", formData.description);
 

    const response = await request.putMultiPart(
      `${baseURL}/api/disease?diseaseId=${diseaseId}`,
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

export async function deleteDiseaseById(diseaseById: string, token: string): Promise<void> {
  return await request.deleteWithOptions(`${baseURL}/api/disease/${diseaseById}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });
}

export const useGetAllDiseases = (
  pageIndex: number,
  pageSize: number,
  diseaseName: string,
  config?: UseQueryOptions<Disease[]>
) => {
  return useQuery<Disease[]>({
    queryKey: ["diseases", pageIndex, pageSize],
    queryFn: async () => {
      const response = await getAllDiseases(pageIndex, pageSize);
      return response.data;
    },
    ...config,
  });
};
