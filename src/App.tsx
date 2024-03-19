import UserList from "./components/userList/UserList";
import { Flex } from "@chakra-ui/react";

const App = () => {
  return (
    <Flex h="100vh" flexDir="column" alignItems="center" justifyContent="center" bg="gray.200">
      <UserList />
    </Flex>
  );
};

export default App;
