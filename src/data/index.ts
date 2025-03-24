export interface GenericResponse<T> {
  message: string;
  data: T;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface PortfolioItem {
  id: number;
  category: string;
  image_url: string;
}

export interface ClientImage {
  id: number;
  client: number;
  image_url: string;
}

export interface ClientData {
  id: number;
  images: ClientImage[];
  category: string;
  name: string;
}

export interface ClientsResponseData {
  message: string;
  data: ClientData[];
}

export interface ClientsResponse {
  message: string;
  total_pages: number;
  current_page: number;
  next: string | null;
  previous: string | null;
  data: ClientsResponseData;
}

export type SingleClientResponse = {
  message: string;
  client_name: string;
  images: ClientImage[];
};

export interface HomeDetailsResponse {
  text: string;
  image_1: string;
  image_2: string;
  image_3: string;
  image_4: string;
  image_5: string;
  image_6: string;
  image_7: string;
  wedding_img: string;
  portrait_img: string;
  engagement_img: string;
}

export interface aboutResponse {
  text: string;
  top_image: string;
  main_img: string;
}

export interface Review {
  id: number;
  name: string;
  comment: string;
  image_url: string;
}
