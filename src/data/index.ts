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

