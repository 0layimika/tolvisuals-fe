import { ClientsResponse } from "@/data";
import { APIClient } from "@/service/apiClient";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient<ClientsResponse>("/clients");

export const useGetClients = (filters?: Record<string, any>, id?: number) => {
  return useQuery({
    queryKey: ["clients", apiClient.endpoint, filters],
    queryFn: () => apiClient.get(filters, id),
  });
};
