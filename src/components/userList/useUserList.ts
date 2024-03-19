import { useCallback, useEffect, useRef, useState } from "react";
import { getUsers, getUsersNextOrPreviousPage } from "../../api/users-api";
import { UserT } from "../../types/user-type";

export const useUserList = () => {
  const [isInit, setInit] = useState(false);
  const [users, setUsers] = useState<UserT[]>([]);
  const [nextUrl, setNextUrl] = useState("");
  const [previousUrl, setPreviousUrl] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [savedUrl, setSavedUrl] = useState<string | undefined>();
  const filtersChanged = useRef(false);
  const [filters, setFilters] = useState({
    username: "",
    email: "",
    hometown: "",
    age: "",
    gender: "",
  });

  const handleNextPrevious = (direction: "next" | "previous") => {
    getUsersNextOrPreviousPage(
      direction === "next" ? nextUrl : previousUrl
    ).then(({ users, next, previous, count, url }) => {
      setUsers(users);
      setNextUrl(next);
      setPreviousUrl(previous);
      setTotalCount(count);
      setCurrentPage(currentPage + (direction === "next" ? 1 : -1));
      setSavedUrl(url);
    });
  };

  const getCurrentPage = useCallback(() => {
    getUsers(filters, savedUrl).then(({ users, next, previous, count }) => {
      setUsers(users);
      setNextUrl(next);
      setPreviousUrl(previous);
      setTotalCount(count);
      setSavedUrl(undefined);
    });
  }, [filters, savedUrl]);

  useEffect(() => {
    // Load data on filter change
    if (filtersChanged.current) {
      const debounceTimer = setTimeout(() => {
        getCurrentPage();
      }, 500);
      return () => clearTimeout(debounceTimer);
    }
  }, [filters, getCurrentPage]);

  useEffect(() => {
    // Load data on init
    if (!isInit) {
      getCurrentPage();
      setInit(true);
    }
  }, [getCurrentPage, isInit]);

  const handleFilterChange = (value: string, key: string) => {
    setFilters({ ...filters, [key]: value });
    filtersChanged.current = true;
  };

  return {
    users,
    nextUrl,
    previousUrl,
    totalCount,
    currentPage,
    handleNextPrevious,
    getCurrentPage,
    handleFilterChange,
    filters,
  };
};
