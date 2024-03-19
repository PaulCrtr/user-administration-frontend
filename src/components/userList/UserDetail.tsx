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
import { useEffect, useState } from "react";
import { updateUser } from "../../api/users-api";

type UserDetailProps = {
  userDetail: UserT | undefined;
  closeModal: () => void;
  isOpen: boolean;
  getCurrentPage: () => void;
};

const UserDetail = ({ closeModal, isOpen, userDetail, getCurrentPage }: UserDetailProps) => {
  const [updatedUserDetail, setUpdatedUserDetail] = useState<UserT>({
    username: "",
    email: "",
    profile: {
      hometown: "",
      age: 0,
      gender: "",
    },
  });

  useEffect(() => {
    userDetail && setUpdatedUserDetail(userDetail);
  }, [userDetail]);

  const onClickUpdate = () => {
    userDetail?.id &&
      updateUser(userDetail.id, updatedUserDetail).then(() => {
        getCurrentPage();
        closeModal();
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{userDetail?.username}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={5}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="Username"
                value={updatedUserDetail.username}
                onChange={(e) => setUpdatedUserDetail({ ...updatedUserDetail, username: e.target.value })}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                value={updatedUserDetail.email}
                onChange={(e) => setUpdatedUserDetail({ ...updatedUserDetail, email: e.target.value })}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Hometown</FormLabel>
              <Input
                placeholder="Hometown"
                value={updatedUserDetail.profile?.hometown}
                onChange={(e) => setUpdatedUserDetail({ ...updatedUserDetail, profile: { ...updatedUserDetail.profile, hometown: e.target.value } })}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Age</FormLabel>
              <NumberInput
                min={0}
                value={updatedUserDetail.profile?.age}
                onChange={(value) => setUpdatedUserDetail({ ...updatedUserDetail, profile: { ...updatedUserDetail.profile, age: Number(value) } })}
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
                value={updatedUserDetail.profile?.gender}
                onChange={(e) => setUpdatedUserDetail({ ...updatedUserDetail, profile: { ...updatedUserDetail.profile, gender: e.target.value } })}
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

export default UserDetail;
