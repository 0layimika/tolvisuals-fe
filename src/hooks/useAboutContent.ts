import { aboutResponse, GenericResponse } from "@/data";
import { APIClient } from "@/service/apiClient";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient<GenericResponse<aboutResponse>>("/about");

export const useGetAboutContent = () => {
  return useQuery({
    queryKey: ["aboutContent", apiClient.endpoint],
    queryFn: () => apiClient.get(),
  });
};
