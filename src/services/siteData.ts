import axios from "axios";
import { getValues, removeValues, setValues } from "./storage";

export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";

const TOKEN_KEY = "admin_token";

export const getToken = () => getValues(TOKEN_KEY);
export const setToken = (token: string) => setValues(TOKEN_KEY, token);
export const clearToken = () => removeValues(TOKEN_KEY);

export interface Project {
  title: string;
  projectCategory: string[];
  technologies: string[];
  projectDesc: string;
  projectLink: string;
  projStatus: boolean;
}

export interface SiteData {
  hero: { image: string };
  about: { images: string[] };
  cv: { url: string; fileName: string };
  projects: Project[];
}

const client = axios.create({
  baseURL: `${API_URL}/api/dashboard`,
});

const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

export const getSiteData = async (): Promise<SiteData> => {
  const res = await client.get("/site-data");
  return res.data?.data;
};

export const login = async (email: string, password: string): Promise<string> => {
  const res = await client.post("/login", { email, password });
  return res.data?.token;
};

export const verifyToken = async (token: string): Promise<boolean> => {
  const res = await client.get("/verify", { headers: authHeaders(token) });
  return res.data?.message === "Valid token";
};

export const saveSiteData = async (
  token: string,
  patch: Partial<SiteData>
): Promise<SiteData> => {
  const res = await client.put("/site-data", patch, {
    headers: authHeaders(token),
  });
  return res.data?.data;
};

export const uploadFile = async (
  token: string,
  file: string,
  folder = "portfolio"
): Promise<{ url: string; publicId: string }> => {
  const res = await client.post(
    "/upload",
    { file, folder },
    { headers: authHeaders(token) }
  );
  return res.data?.data;
};

export const addProject = async (
  token: string,
  project: Project
): Promise<Project> => {
  const res = await client.post("/projects", project, {
    headers: authHeaders(token),
  });
  return res.data?.data;
};

export const updateProject = async (
  token: string,
  index: number,
  project: Project
): Promise<Project> => {
  const res = await client.put(`/projects/${index}`, project, {
    headers: authHeaders(token),
  });
  return res.data?.data;
};

export const deleteProject = async (
  token: string,
  index: number
): Promise<void> => {
  await client.delete(`/projects/${index}`, {
    headers: authHeaders(token),
  });
};

export const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const getProxiedPdfUrl = (url: string): string => {
  return `${API_URL}/api/dashboard/proxy-pdf?url=${encodeURIComponent(url)}`;
};
