import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request ,{baseURL}  from "@/services/apiClient";
import { Food } from "./types";

export async function getAllProducts(pageIndex: number, pageSize: number, search: string): Promise<Food[]> {
  return await request.get(`${baseURL}/api/Food?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${search}`);
}

export async function getFoodById(id: string): Promise<Food> {
  return await request.get(`${baseURL}/api/Food/${id}`);
}

// export async function addProduct(product: AddProductForm, token: string) {
//   try {
//     const formData = new FormData();

//     formData.append("ProductKey", product.productKey || 'null');
//     formData.append("Name", product.name);
//     formData.append("ImageUrl", product.imageUrl as any); 
//     formData.append("Description", product.description || 'null');
//     formData.append("Guides", product.guides || 'null');
//     formData.append("Price", String(product.price));
//     formData.append("Inventory", String(product.inventory));
//     formData.append("Engrave", product.engrave || 'null');
//     formData.append("Status", product.status || 'ACTIVE');

//     return await request.postMultiPart(`${baseURL}/api/Food`, formData, {
//       headers: {
//         "Authorization": `Bearer ${token}`,
//       }
//     });
//   } catch (error: any) {
//     console.error("Error adding product:", error?.response || error?.message);
//     throw error;
//   }
// }
export async function updateFood(id: string, formData: FormData, token: string) {
  try {
  
    const response = await request.putMultiPart(`${baseURL}/api/Food/${id}`, formData, {
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

export async function deleteFoodById(id: string, token: string): Promise<void> {
  return await request.deleteWithOptions(`${baseURL}/api/Food/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });
}

export const useGetAllProducts = (
  pageIndex: number,
  pageSize: number,
  search: string,
  config?: UseQueryOptions<Food[]>
) => {
  return useQuery({
    queryKey: ["products", pageIndex, pageSize, search],
    queryFn: () => getAllProducts(pageIndex, pageSize, search),
    ...config,
  });
}
