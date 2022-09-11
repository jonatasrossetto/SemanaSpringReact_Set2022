// se a variável de ambiente VITE_BACKEND_URL for null utilize http://localhost:8080

export const BASE_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8080";