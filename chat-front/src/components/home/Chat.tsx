import { TabPanel, TabPanels, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const Chat = () => {
  const { friendList } = useContext(ChatContext);
  return (
    <VStack>
      <TabPanels>
        {friendList?.map((friend) => (
          <TabPanel key={friend.id + friend.username}>
            {friend.username}
          </TabPanel>
        ))}
        {friendList?.length === 0 && <TabPanel>No friends</TabPanel>}
      </TabPanels>
    </VStack>
  );
};

export default Chat;
