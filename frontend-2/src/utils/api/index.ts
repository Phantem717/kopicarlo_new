import { create } from "apisauce";

export const api = create({
  baseURL: "/api",
  timeout: 10000,
});
