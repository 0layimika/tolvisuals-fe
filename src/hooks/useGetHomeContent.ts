import { APIClient } from "@/service/apiClient";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient<any>("/home");

export const useGetHomeContent = () => {
  return useQuery({
    queryKey: ["homeContent", apiClient.endpoint],
    queryFn: () => apiClient.get(),
  });
};
