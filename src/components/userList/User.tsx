import { Tr, Td, IconButton, useDisclosure } from "@chakra-ui/react";
import { UserT } from "../../types/user-type";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import UserDetail from "../userDetail/UserDetail";
import { getUserDetail } from "../../api/users-api";
import { useState } from "react";
import DeleteUser from "../deleteUser/DeleteUser";

type UserProps = {
  user: UserT;
  getCurrentPage: () => void;
};

const User = ({ user, getCurrentPage }: UserProps) => {
  const detailModal = useDisclosure();
  const deleteModal = useDisclosure();
  const [userDetail, setUserDetail] = useState<UserT>();

  const onOpenDetailModal = () => {
    user.id &&
      getUserDetail(user.id)
        .then((data) => {
          setUserDetail(data);
        })
        .then(() => detailModal.onOpen());
  };

  return (
    <Tr>
      <Td>{user.username}</Td>
      <Td>{user.email}</Td>
      <Td>{user.profile?.hometown}</Td>
      <Td>{user.profile?.age}</Td>
      <Td>{user.profile?.gender}</Td>
      <Td>
        <IconButton
          onClick={onOpenDetailModal}
          isRound={true}
          aria-label="Edit"
          variant=""
          icon={<EditIcon />}
        />
        <UserDetail
          isOpen={detailModal.isOpen}
          closeModal={detailModal.onClose}
          userDetail={userDetail}
          getCurrentPage={getCurrentPage}
        />
        <IconButton
          onClick={deleteModal.onOpen}
          isRound={true}
          aria-label="Delete"
          variant=""
          icon={<DeleteIcon />}
        />
        <DeleteUser
          isOpen={deleteModal.isOpen}
          onClose={deleteModal.onClose}
          userId={user.id}
          username={user.username}
          getCurrentPage={getCurrentPage}
        />
      </Td>
    </Tr>
  );
};

export default User;
