import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Flex,
  Input,
  Text,
  NumberInput,
  NumberInputField,
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";
import User from "./User";
import Pagination from "../pagination/Pagination";
import { useUserList } from "./useUserList";
import { FaSearch } from "react-icons/fa";

const UserList = () => {
  const {
    users,
    nextUrl,
    previousUrl,
    totalCount,
    currentPage,
    handleNextPrevious,
    getCurrentPage,
    filters,
    handleFilterChange,
  } = useUserList();

  return (
    <Flex flexDir="column" alignItems="center">
      <TableContainer
        bg="white"
        rounded="8px"
        boxShadow="0px 0px 42px -8px rgba(0,0,0,0.3)"
        w="1200px"
        h="450px"
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>
                <Flex flexDir="column">
                  <Text>username</Text>
                  <InputGroup size="xs" w="150px" mt="4px">
                    <InputLeftElement pointerEvents="none">
                      <Icon opacity={0.5} as={FaSearch} />
                    </InputLeftElement>
                    <Input
                      size="xs"
                      variant="filled"
                      value={filters.username}
                      onChange={(e) =>
                        handleFilterChange(e.target.value, "username")
                      }
                    />
                  </InputGroup>
                </Flex>
              </Th>
              <Th>
                <Flex flexDir="column">
                  <Text>Email</Text>
                  <InputGroup size="xs" w="200px" mt="4px">
                    <InputLeftElement pointerEvents="none">
                      <Icon opacity={0.5} as={FaSearch} />
                    </InputLeftElement>
                    <Input
                      size="xs"
                      variant="filled"
                      value={filters.email}
                      onChange={(e) =>
                        handleFilterChange(e.target.value, "email")
                      }
                    />
                  </InputGroup>
                </Flex>
              </Th>
              <Th>
                <Flex flexDir="column">
                  <Text>Hometown</Text>
                  <InputGroup size="xs" w="150px" mt="4px">
                    <InputLeftElement pointerEvents="none">
                      <Icon opacity={0.5} as={FaSearch} />
                    </InputLeftElement>
                    <Input
                      size="xs"
                      variant="filled"
                      value={filters.hometown}
                      onChange={(e) =>
                        handleFilterChange(e.target.value, "hometown")
                      }
                    />
                  </InputGroup>
                </Flex>
              </Th>
              <Th>
                <Flex flexDir="column">
                  <Text>Age</Text>
                  <InputGroup size="xs" w="100px" mt="4px">
                    <InputLeftElement pointerEvents="none">
                      <Icon opacity={0.5} as={FaSearch} />
                    </InputLeftElement>
                    <NumberInput
                      size="xs"
                      variant="filled"
                      value={filters.age}
                      onChange={(value) => handleFilterChange(value, "age")}
                    >
                      <NumberInputField />
                    </NumberInput>
                  </InputGroup>
                </Flex>
              </Th>
              <Th>
                <Flex flexDir="column">
                  <Text>Gender</Text>
                  <InputGroup size="xs" w="150px" mt="4px">
                    <InputLeftElement pointerEvents="none">
                      <Icon opacity={0.5} as={FaSearch} />
                    </InputLeftElement>
                    <Input
                      size="xs"
                      variant="filled"
                      value={filters.gender}
                      onChange={(e) =>
                        handleFilterChange(e.target.value, "gender")
                      }
                    />
                  </InputGroup>
                </Flex>
              </Th>
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
        handleNextPrevious={handleNextPrevious}
      />
    </Flex>
  );
};

export default UserList;
