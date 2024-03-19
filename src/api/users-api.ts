import axios from "axios";
import { FiltersT, UserT } from "../types/user-type";

const USERS_API_URL = "http://localhost:8000/api/users";

export const getUsers = async (
  filters: FiltersT
): Promise<{
  users: UserT[];
  next: string;
  previous: string;
  count: number;
}> => {
  const QUERY_FILTERS = `?username=${filters.username}&email=${filters.email}&profile__hometown=${filters.hometown}&profile__age=${filters.age}&profile__gender=${filters.gender}`;
  const { data } = await axios.get(`${USERS_API_URL}/${QUERY_FILTERS}`);
  return {
    users: data.results,
    next: data.next,
    previous: data.previous,
    count: data.count,
  };
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

export const updateUser = async (
  id: number,
  updatedUser: UserT
): Promise<UserT> => {
  const { data } = await axios.put(`${USERS_API_URL}/${id}/`, updatedUser);
  return data;
};
