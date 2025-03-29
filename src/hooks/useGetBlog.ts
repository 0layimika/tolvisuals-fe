import { Blog, PaginatedResponse } from "@/data";
import { APIClient } from "@/service/apiClient";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient<PaginatedResponse<Blog[]>>("/blogs");

export const useGetBlog = () => {
  return useQuery({
    queryKey: ["faqs", apiClient.endpoint],
    queryFn: () => apiClient.get(),
  });
};

