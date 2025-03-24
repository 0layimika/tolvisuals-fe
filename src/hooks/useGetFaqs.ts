import { FAQItem, GenericResponse } from "@/data";
import { APIClient } from "@/service/apiClient";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient<GenericResponse<FAQItem[]>>("/faq");

export const useGetFaq = () => {
  return useQuery({
    queryKey: ["faqs", apiClient.endpoint],
    queryFn: () => apiClient.get(),
  });
};
