import { ChatIcon } from "@chakra-ui/icons";
import {
  Button,
  Circle,
  Divider,
  HStack,
  Heading,
  Tab,
  TabList,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import AddFriendModal from "../AddFriendModal";

const Sidebar = () => {
  const { friendList } = useContext(ChatContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack py='1.4rem'>
        <HStack justify='space-evenly' w='100%'>
          <Heading size='md'>Add Friend</Heading>
          <Button onClick={onOpen}>
            <ChatIcon />
          </Button>
        </HStack>
        <Divider />
        <VStack as={TabList}>
          {friendList?.map((friend) => (
            <HStack as={Tab} key={friend.id + friend.username}>
              <Circle
                size='10px'
                bg={friend.connected ? "green.500" : "red.500"}
              />
              <Text>{friend.username}</Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
      <AddFriendModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Sidebar;
