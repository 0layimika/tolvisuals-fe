import { Blog, GenericResponse } from "@/data";
import { APIClient } from "@/service/apiClient";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient<GenericResponse<Blog>>("/blogs");

export const useGetSingleBlog = (
  filters?: Record<string, any>,
  id?: number
) => {
  return useQuery({
    queryKey: ["per-blog", apiClient.endpoint, filters],
    queryFn: () => apiClient.get(filters, id),
  });
};
