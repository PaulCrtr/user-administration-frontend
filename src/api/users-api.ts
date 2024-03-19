import axios from "axios";
import { UserT } from "../types/user-type";

const USERS_API_URL = "http://localhost:8000/api/users";

export const getUsers = async ({
  page,
  nextUrl,
  previousUrl,
}: {
  page: "next" | "previous" | number;
  nextUrl: string;
  previousUrl: string;
}): Promise<{
  users: UserT[];
}> => {
  const paginationURL = page === "next" ? nextUrl : page === "previous" ? previousUrl : null;
  const url = paginationURL ? paginationURL : USERS_API_URL;
  const { data } = await axios.get(url);
  return { users: data.results };
};

export const getUserDetail = async (id: number): Promise<UserT> => {
  const { data } = await axios.get(`${USERS_API_URL}/${id}`);
  return data;
};

export const updateUser = async (id: number, updatedUser: UserT): Promise<UserT> => {
  const { data } = await axios.put(`${USERS_API_URL}/${id}/`, updatedUser);
  return data;
};
