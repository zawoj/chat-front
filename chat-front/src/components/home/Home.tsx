import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import ChatContextProvider from "../../context/ChatContext";

const Home = () => {
  return (
    <ChatContextProvider>
      <Grid
        templateColumns={{
          base: "repeat(10, 1fr)",
        }}
        gap={6}
        h='100vh'
        as={Tabs}
      >
        <GridItem colSpan={3} borderRight='1px solid gray'>
          <Sidebar />
        </GridItem>
        <GridItem colSpan={7}>
          <Chat />
        </GridItem>
      </Grid>
    </ChatContextProvider>
  );
};

export default Home;
