import { createContext, useState } from "react";

type ChatContextType = {
  friendList: FriendListType[] | null;
  setFriendList: (friendList: FriendListType[]) => void;
};

type FriendListType = {
  id: string;
  username: string;
  connected: boolean;
};

type FriendListResponseType = {
  friendList: FriendListType[] | null;
};

export const ChatContext = createContext<ChatContextType>({
  friendList: null,
  setFriendList: () => {},
});

const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [chat, setChat] = useState<FriendListResponseType>({
    friendList: [
      {
        id: "1",
        username: "Jhon",
        connected: true,
      },
      {
        id: "2",
        username: "Jhon two",
        connected: false,
      },
    ],
  });

  const setFriendList = (friendList: FriendListType[]) => {
    setChat({ friendList });
  };

  return (
    <ChatContext.Provider
      value={{
        friendList: chat.friendList,
        setFriendList,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
