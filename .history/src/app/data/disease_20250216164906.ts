import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request  from "@/services/apiClient";
import baseURL from "@/services/apiClient";
import { Allergy } from "./types";

export async function getAllDiseases(pageIndex: number, pageSize: number, search: string): Promise<Allergy[]> {
  return await request.get(`${baseURL}/api/disease?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${search}`);
}

export async function getDiseaseById(desease: string): Promise<Allergy> {
  return await request.get(`${baseURL}/api/disease/${desease}`);
}

export async function createDisease(formData: FormData, token: string): Promise<Allergy> {
    try {
      const response = await request.postMultiPart(`${baseURL}/api/disease`, formData, {
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

export async function updateDisease(desease: string, formData: FormData, token: string) {
  try {
  
    const response = await request.putMultiPart(`${baseURL}/api/disease/${desease}`, formData, {
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

export async function deleteDiseaseById(desease: string, token: string): Promise<void> {
  return await request.deleteWithOptions(`${baseURL}/api/disease/${desease}`, {
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
    queryFn: () => getAllDiseases(pageIndex, pageSize, search),
    ...config,
  });
}
