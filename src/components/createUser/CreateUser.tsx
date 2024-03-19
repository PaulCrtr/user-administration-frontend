import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Stack,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { UserT } from "../../types/user-type";
import { useState } from "react";
import { createUser } from "../../api/users-api";

type createUserProps = {
  closeModal: () => void;
  isOpen: boolean;
  getCurrentPage: () => void;
};

const CreateUser = ({
  closeModal,
  isOpen,
  getCurrentPage,
}: createUserProps) => {
  const [newUser, setNewUser] = useState<UserT>({
    username: "",
    email: "",
    profile: {
      hometown: "",
      age: 0,
      gender: "",
    },
  });

  const onClickUpdate = () => {
    createUser(newUser).then(() => {
      getCurrentPage();
      closeModal();
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create user</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={5}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="Username"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    username: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    email: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Hometown</FormLabel>
              <Input
                placeholder="Hometown"
                value={newUser.profile?.hometown}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    profile: {
                      ...newUser.profile,
                      hometown: e.target.value,
                    },
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Age</FormLabel>
              <NumberInput
                min={0}
                value={newUser.profile?.age}
                onChange={(value) =>
                  setNewUser({
                    ...newUser,
                    profile: {
                      ...newUser.profile,
                      age: Number(value),
                    },
                  })
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Gender</FormLabel>
              <Input
                placeholder="Gender"
                value={newUser.profile?.gender}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    profile: {
                      ...newUser.profile,
                      gender: e.target.value,
                    },
                  })
                }
              />
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={closeModal}>
            Close
          </Button>
          <Button onClick={onClickUpdate} colorScheme="blue">
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateUser;
