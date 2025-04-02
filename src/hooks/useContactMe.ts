import { APIClient } from "@/service/apiClient";
import { useMutation } from "@tanstack/react-query";

const apiClient = new APIClient("/contact");
const register = (data: FormData) => {
  return apiClient.submitReview(data);
};

export const useContactMe = () => {
  const mutation = useMutation({
    mutationFn: register,
    onError: (error: any) => {
      console.log(error);
    },
    onSuccess: (data: any) => {
      console.log(data);
    },
  });

  return { ...mutation };
};
