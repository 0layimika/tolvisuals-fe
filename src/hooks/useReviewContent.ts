import { APIClient } from "@/service/apiClient";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient<any>("/review");

export const useGetReviews = () => {
  return useQuery({
    queryKey: ["testimonials", apiClient.endpoint],
    queryFn: () => apiClient.get(),
  });
};
