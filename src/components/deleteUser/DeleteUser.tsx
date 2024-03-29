import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { deleteUser } from "../../api/users-api";

type DeleteUserProps = {
  userId?: number;
  username: string;
  onClose: () => void;
  isOpen: boolean;
  getCurrentPage: () => void;
};

const DeleteUser = ({
  userId,
  onClose,
  isOpen,
  username,
  getCurrentPage,
}: DeleteUserProps) => {
  const cancelRef = React.useRef(null);

  const handleDelete = () => {
    userId &&
      deleteUser(userId).then(() => {
        getCurrentPage();
        onClose();
      });
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete User "{username} #{userId}"
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteUser;
