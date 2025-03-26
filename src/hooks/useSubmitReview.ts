import { SubmitReview } from "@/data";
import { APIClient } from "@/service/apiClient";
import { useMutation } from "@tanstack/react-query";

const apiClient = new APIClient("/review");
const register = (data: FormData) => {
  return apiClient.submitReview(data);
};

export const useSubmitReviews = () => {
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
