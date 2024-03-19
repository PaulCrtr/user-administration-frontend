import UserList from "./components/userList/UserList";
import { Flex, Button } from "@chakra-ui/react";

const App = () => {
  return (
    <Flex h="100vh" flexDir="column" alignItems="center" bg="gray.200">
      <Button>COUCOU</Button>

      <UserList />
    </Flex>
  );
};

export default App;
