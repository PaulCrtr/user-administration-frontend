import { Table, Thead, Tbody, Tr, Th, TableContainer, Flex } from "@chakra-ui/react";
import { getUsers, getUsersNextOrPreviousPage } from "../../api/users-api";
import { useCallback, useEffect, useState } from "react";
import { UserT } from "../../types/user-type";
import User from "./User";
import Pagination from "../pagination/Pagination";
import queryString from 'query-string';


const UserList = () => {
  const [users, setUsers] = useState<UserT[]>([]);

  const [nextUrl, setNextUrl] = useState("");
  const [previousUrl, setPreviousUrl] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);


  const getNextPage = () => {
    getUsersNextOrPreviousPage(nextUrl).then(({ users, next, previous, count }) => {
      setUsers(users);
      setNextUrl(next);
      setPreviousUrl(previous);
      setTotalCount(count);
    });
  };

  const getPreviousPage = () => {
    getUsersNextOrPreviousPage(previousUrl).then(({ users, next, previous, count }) => {
      setUsers(users);
      setNextUrl(next);
      setPreviousUrl(previous);
      setTotalCount(count);
    });
  };

  const loadCurrentPage = () => {
    getUsers().then(({ users, next, previous, count }) => {
      setUsers(users);
      setNextUrl(next);
      setPreviousUrl(previous);
      setTotalCount(count);
    });
  };

  useEffect(() => {
    loadCurrentPage();
  }, []);

  return (
    <Flex flexDir="column" alignItems="center">
      <TableContainer bg="white" mt="20px" rounded="8px" boxShadow="0px 0px 42px -8px rgba(0,0,0,0.3)">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>username</Th>
              <Th>email</Th>
              <Th>hometown</Th>
              <Th isNumeric>age</Th>
              <Th>Gender</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <User user={user} loadCurrentPage={loadCurrentPage} key={user.id} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination
        next={nextUrl}
        previous={previousUrl}
        resultsPerPage={5}
        totalCount={totalCount}
        currentPage={currentPage}
        getNextPage={getNextPage}
        getPreviousPage={getPreviousPage}
      />
    </Flex>
  );
};

export default UserList;
