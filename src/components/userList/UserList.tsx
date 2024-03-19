import { Table, Thead, Tbody, Tr, Th, TableContainer, Flex } from "@chakra-ui/react";
import User from "./User";
import Pagination from "../pagination/Pagination";
import { useUserList } from "./useUserList";

const UserList = () => {
  const { users, nextUrl, previousUrl, totalCount, currentPage, getNextPage, getPreviousPage, getCurrentPage } = useUserList();

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
              <User user={user} getCurrentPage={getCurrentPage} key={user.id} />
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
