import { SingleClientResponse } from "@/data";
import { APIClient } from "@/service/apiClient";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient<SingleClientResponse>("/clients");

export const useGetSingleClient = (
  filters?: Record<string, any>,
  id?: number
) => {
  return useQuery({
    queryKey: ["per-client", apiClient.endpoint, filters],
    queryFn: () => apiClient.get(filters, id),
  });
};
