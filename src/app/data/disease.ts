import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request, { baseURL } from "@/services/apiClient";
import { Disease } from "./types";
import { ApiResponse } from ".";

export async function getAllDiseases(
  pageIndex: number,
  pageSize: number
): Promise<ApiResponse<Disease[]>> {
  return await request.get(`${baseURL}/api/disease?pageIndex=${pageIndex}&pageSize=${pageSize}`);
}

export async function getDiseaseById(diseaseId: number): Promise<ApiResponse<Disease>> {
  return await request.get(`${baseURL}/api/disease/${diseaseId}`);
}

// ✅ createDisease: multipart/form-data (cho nhiều dữ liệu)
export async function createDisease(formData: { diseaseName: string; description: string }): Promise<Disease> {
  const form = new FormData();
  form.append("diseaseName", formData.diseaseName);
  form.append("description", formData.description);

  return await request.postMultiPart(`${baseURL}/api/disease`, form);
}

// ✅ updateDisease: application/json (dữ liệu dạng JSON)
export async function updateDisease(
  diseaseId: number,
  formData: { diseaseName: string; description: string }
): Promise<Disease> {
  try {
    const response = await request.put(
      `${baseURL}/api/disease?diseaseId=${diseaseId}`,
      formData
    );
    return response;
  } catch (error) {
    console.error("Lỗi khi cập nhật dị ứng:", error);
    throw error;
  }
}

export async function deleteDiseaseById(diseaseId: number): Promise<void> {
  await request.delete(`${baseURL}/api/disease/${diseaseId}`);
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
