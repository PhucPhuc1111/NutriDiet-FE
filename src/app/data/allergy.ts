import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request, { baseURL } from "@/services/apiClient";
import { Allergy } from "./types";
import { ApiResponse } from ".";

export async function getAllAllergies(
  pageIndex: number,
  pageSize: number
): Promise<ApiResponse<Allergy[]>> {
  return await request.get(`${baseURL}/api/allergy?pageIndex=${pageIndex}&pageSize=${pageSize}`);
}

export async function getAllergyById(allergyId: number): Promise<ApiResponse<Allergy>> {
  return await request.get(`${baseURL}/api/allergy/${allergyId}`);
}

export async function createAllergy(formData: { allergyName: string; notes: string }): Promise<Allergy> {
  const form = new FormData();
  form.append("allergyName", formData.allergyName);
  form.append("notes", formData.notes);

  return await request.postMultiPart(`${baseURL}/api/allergy`, form);
}

export async function updateAllergy(
  allergyId: number,
  formData: { allergyName: string; notes: string }
): Promise<Allergy> {
  try {
    const response = await request.put(
      `${baseURL}/api/allergy?allergyId=${allergyId}`,
      formData
    );
    return response;
  } catch (error) {
    console.error("Lỗi khi cập nhật dị ứng:", error);
    throw error;
  }
}


export async function deleteAllergyById(allergyId: string): Promise<void> {
  await request.delete(`${baseURL}/api/allergy/${allergyId}`);
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
