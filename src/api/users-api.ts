import axios from "axios";
import { UserT } from "../types/user-type";

const USERS_API_URL = "http://localhost:8000/api/users";

export const getUsers = async (): Promise<{
  users: UserT[];
  next: string;
  previous: string;
  count: number;
}> => {
  const {
    data: { results, next, previous, count },
  } = await axios.get(USERS_API_URL);
  return { users: results, next, previous, count };
};

export const getUsersNextOrPreviousPage = async (url: string) => {
  const {
    data: { results, next, previous, count },
  } = await axios.get(url);
  return { users: results, next, previous, count };
};

export const getUserDetail = async (id: number): Promise<UserT> => {
  const { data } = await axios.get(`${USERS_API_URL}/${id}`);
  return data;
};

export const updateUser = async (id: number, updatedUser: UserT): Promise<UserT> => {
  const { data } = await axios.put(`${USERS_API_URL}/${id}/`, updatedUser);
  return data;
};
