import axios from "axios";
import type { Task } from "../pages/task";


const API_URL = "http://localhost:3000/tasks";

export function getTasks(token: string) {
  return axios.get<Task[]>(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function createTask(
    data: Pick<Task,"title" | "description" | "status">,
    token: string
){
    return axios.post(API_URL, data,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}
export function updateTask(
  id: number,
  data: Pick<Task, "title" | "description" | "status">,
  token: string
) {
  return axios.put(`${API_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function deleteTask(id: number, token: string) {
  return axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}