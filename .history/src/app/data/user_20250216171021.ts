import  request from "@/services/apiClient";
import  baseURL from "@/services/apiClient";
export function getMe(token: string): Promise<User> {
    return request.get(`${baseURL}/api/Account/whoami`, {
      headers: {
        'Content-Type': 'application/json' ,
        'Authorization': `Bearer ${token}`,
      },
    });
  }
export function getProfile(): Promise<{ user?: Profile, detail: User }> {
    return request.get(`/api/me`);
  }
  
  export const useGetProfile = () => {
    return useQuery({
      queryKey: ['profile'],
      queryFn: getProfile,
    })
  }