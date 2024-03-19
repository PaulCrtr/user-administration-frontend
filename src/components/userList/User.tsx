import { Tr, Td, IconButton, useDisclosure } from "@chakra-ui/react";
import { UserT } from "../../types/user-type";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import UserDetail from "./UserDetail";
import { getUserDetail } from "../../api/users-api";
import { useState } from "react";

type UserProps = {
  user: UserT;
  getCurrentPage: () => void;
};

const User = ({ user, getCurrentPage }: UserProps) => {
  const detailModal = useDisclosure();
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
      <Td isNumeric>{user.profile?.age}</Td>
      <Td>{user.profile?.gender}</Td>
      <Td>
        <IconButton onClick={onOpenDetailModal} isRound={true} aria-label="Edit" variant="" icon={<EditIcon />} />
        <UserDetail isOpen={detailModal.isOpen} closeModal={detailModal.onClose} userDetail={userDetail} getCurrentPage={getCurrentPage} />
        <IconButton isRound={true} aria-label="Delete" variant="" icon={<DeleteIcon />} />
      </Td>
    </Tr>
  );
};

export default User;
