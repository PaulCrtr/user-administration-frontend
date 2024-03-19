import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";
import { getUsers } from "../../api/users-api";
import { useCallback, useEffect, useState } from "react";
import { UserT } from "../../types/user-type";
import User from "./User";

const UserList = () => {
  const [users, setUsers] = useState<UserT[]>([]);

  const [nextUrl, setNextUrl] = useState("");
  const [previousUrl, setPreviousUrl] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const loadUsers = useCallback(
    (page: "next" | "previous" | number) => {
      getUsers({ page: page || 0, nextUrl, previousUrl }).then(({ users }) => {
        setUsers(users);
      });
    },
    [nextUrl, previousUrl]
  );

  const loadCurrentPage = useCallback(() => {
    loadUsers(currentPage);
  }, [currentPage, loadUsers]);

  useEffect(() => {
    loadCurrentPage();
  }, [loadCurrentPage]);

  return (
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
  );
};

export default UserList;
