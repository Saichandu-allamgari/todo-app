import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Backend URL
  withCredentials: true, // Allows session cookies
});

// Auth API
export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);
export const logout = () => API.post("/auth/logout");
export const getUser = () => API.get("/auth/me");

// Task API
export const fetchTasks = () => API.get("/tasks");
export const addTask = (task) => API.post("/tasks", task);
export const updateTask = (id, task) => API.put(`/tasks/${id}`, task);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);