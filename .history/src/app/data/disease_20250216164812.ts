import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request  from "@/services/apiClient";
import baseURL from "@/services/apiClient";
import { Allergy } from "./types";

export async function getAllDiseases(pageIndex: number, pageSize: number, search: string): Promise<Allergy[]> {
  return await request.get(`${baseURL}/api/allergy?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${search}`);
}

export async function getDiseaseById(allergyId: string): Promise<Allergy> {
  return await request.get(`${baseURL}/api/allergy/${allergyId}`);
}

export async function createDisease(formData: FormData, token: string): Promise<Allergy> {
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

export async function updateDisease(allergyId: string, formData: FormData, token: string) {
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

export async function deleteDiseaseById(allergyId: string, token: string): Promise<void> {
  return await request.deleteWithOptions(`${baseURL}/api/allergy/${allergyId}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });
}

export const useGetAllDiseases = (
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
