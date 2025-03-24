import { GenericResponse, Review } from "@/data";
import { APIClient } from "@/service/apiClient";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient<GenericResponse<Review[]>>("/review");

export const useGetReviews = () => {
  return useQuery({
    queryKey: ["testimonials", apiClient.endpoint],
    queryFn: () => apiClient.get(),
  });
};
