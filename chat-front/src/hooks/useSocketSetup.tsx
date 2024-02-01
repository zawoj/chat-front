import { useContext, useEffect } from "react";
import socket from "../socket";
import { UserContext } from "../context/UserContext";

const useSocketSetup = () => {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    socket.connect();
    socket.on("connect_error", () => {
      setUser({
        loggedIn: false,
        user: null,
      });
    });

    return () => {
      socket.off("connect_error");
    };
  }, [setUser]);
};

export default useSocketSetup;
