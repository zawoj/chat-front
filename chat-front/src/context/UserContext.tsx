import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type UserContextType = {
  user: UserType | null;
  loggedIn: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserResponseType>>;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  loggedIn: false,
  setUser: () => {},
});

export type UserType = {
  id: string;
  username: string;
};

export type UserResponseType = {
  user: UserType | null;
  loggedIn: boolean;
};

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserResponseType>({
    user: null,
    loggedIn: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/auth/me", {
      method: "GET",
      credentials: "include",
    })
      .catch((err) => {
        return;
      })
      .then((res) => {
        if (!res || !res.ok || res.status >= 400) {
          setUser({ user: null, loggedIn: false });
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        setUser({ user: data.user, loggedIn: true });
        navigate("/home");
      });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: user.user,
        loggedIn: user.loggedIn,
        setUser: setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
