import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request, { baseURL } from "@/services/apiClient";
import { Allergy } from "./types";

// Updated function to accept `allergyName` and pass it to the backend.
export async function getAllAllergies(pageIndex: number, pageSize: number, allergyName: string): Promise<Allergy[]> {
  // Add `allergyName` as a query parameter if it's provided
  const query = new URLSearchParams({
    pageIndex: pageIndex.toString(),
    pageSize: pageSize.toString(),
  });

  if (allergyName) {
    query.append('allergyName', allergyName);
  }

  return await request.get(`${baseURL}/api/allergy?${query.toString()}`);
}

// Fetch allergy by id
export async function getAllergyById(allergyId: string): Promise<Allergy> {
  return await request.get(`${baseURL}/api/allergy/${allergyId}`);
}

// Create allergy
export async function createAllergy(formData: FormData, token: string): Promise<Allergy> {
  try {
    const response = await request.postMultiPart(`${baseURL}/api/allergy`, formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error creating allergy:", error);
    throw error;
  }
}

// Update allergy
export async function updateAllergy(allergyId: string, formData: FormData, token: string) {
  try {
    const response = await request.putMultiPart(`${baseURL}/api/allergy/${allergyId}`, formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error updating allergy:", error);
    throw error;
  }
}

// Delete allergy by ID
export async function deleteAllergyById(allergyId: string, token: string): Promise<void> {
  return await request.deleteWithOptions(`${baseURL}/api/allergy/${allergyId}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

// Hook to fetch allergies with optional search by name
export const useGetAllAllergies = (
  pageIndex: number,
  pageSize: number,
  allergyName: string,
  config?: UseQueryOptions<Allergy[]>
) => {
  return useQuery({
    queryKey: ["allergies", pageIndex, pageSize, allergyName],  // Make sure allergyName is part of the query key
    queryFn: () => getAllAllergies(pageIndex, pageSize, allergyName),  // Pass allergyName to the function
    ...config,
  });
};
