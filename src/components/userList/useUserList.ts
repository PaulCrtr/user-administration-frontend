import { useEffect, useState } from "react";
import { getUsers, getUsersNextOrPreviousPage } from "../../api/users-api";
import { UserT } from "../../types/user-type";

export const useUserList = () => {
  const [users, setUsers] = useState<UserT[]>([]);

  const [nextUrl, setNextUrl] = useState("");
  const [previousUrl, setPreviousUrl] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const getNextPage = () => {
    getUsersNextOrPreviousPage(nextUrl).then(({ users, next, previous, count }) => {
      setUsers(users);
      setNextUrl(next);
      setPreviousUrl(previous);
      setTotalCount(count);
      setCurrentPage(currentPage + 1);
    });
  };

  const getPreviousPage = () => {
    getUsersNextOrPreviousPage(previousUrl).then(({ users, next, previous, count }) => {
      setUsers(users);
      setNextUrl(next);
      setPreviousUrl(previous);
      setTotalCount(count);
      setCurrentPage(currentPage - 1);
    });
  };

  const getCurrentPage = () => {
    getUsers().then(({ users, next, previous, count }) => {
      setUsers(users);
      setNextUrl(next);
      setPreviousUrl(previous);
      setTotalCount(count);
    });
  };

  useEffect(() => {
    getCurrentPage();
  }, []);

  return {
    users,
    nextUrl,
    previousUrl,
    totalCount,
    currentPage,
    getNextPage,
    getPreviousPage,
    getCurrentPage,
  };
};
