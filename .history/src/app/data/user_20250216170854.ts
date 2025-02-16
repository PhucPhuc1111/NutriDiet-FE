export function getProfile(): Promise<{ user?: Profile, detail: User }> {
    return request.get(`/api/me`);
  }
  
  export const useGetProfile = () => {
    return useQuery({
      queryKey: ['profile'],
      queryFn: getProfile,
    })
  }