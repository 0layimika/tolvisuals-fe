import { GenericResponse, HomeDetailsResponse } from "@/data";
import { APIClient } from "@/service/apiClient";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient<GenericResponse<HomeDetailsResponse>>("/home");

export const useGetHomeContent = () => {
  return useQuery({
    queryKey: ["homeContent", apiClient.endpoint],
    queryFn: () => apiClient.get(),
  });
};
