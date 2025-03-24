import { GenericResponse, PortfolioItem } from "@/data";
import { APIClient } from "@/service/apiClient";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient<GenericResponse<PortfolioItem[]>>("/portfolio");

export const usePortfolio = (filters?: Record<string, any>) => {
  return useQuery({
    queryKey: ["portfolioContent", apiClient.endpoint, filters],
    queryFn: () => apiClient.get(filters),
  });
};
