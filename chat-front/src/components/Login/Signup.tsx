import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, Heading, VStack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import TextField from "./TextField";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState("");
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={Yup.object({
        username: Yup.string()
          .required("Username required!")
          .min(6, "Username too short!")
          .max(28, "Username too long!"),
        password: Yup.string()
          .required("Password required!")
          .min(6, "Password too short!")
          .max(28, "Password too long!"),
      })}
      onSubmit={(values, actions) => {
        const vals = { ...values };
        actions.resetForm();
        fetch("http://localhost:4000/auth/signup", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vals),
        })
          .catch((err) => {
            setError(err.message);
            return;
          })
          .then((res) => {
            if (!res || !res.ok || res.status >= 400) {
              setError("Invalid username or password!");
              return;
            }
            return res.json();
          })
          .then((data) => {
            if (!data) return;
            setUser({ user: data.user, loggedIn: true });
            navigate("/");
          });
      }}
    >
      <VStack
        as={Form}
        w={{ base: "90%", md: "500px" }}
        m='auto'
        justify='center'
        h='100vh'
        spacing='1rem'
      >
        <Heading>Sign Up</Heading>
        {error && (
          <Text color='red.500' fontSize='sm'>
            {error}
          </Text>
        )}
        <TextField
          name='username'
          placeholder='Enter username'
          autoComplete='off'
          label='Username'
        />

        <TextField
          name='password'
          placeholder='Enter password'
          autoComplete='off'
          label='Password'
          type='password'
        />

        <ButtonGroup pt='1rem'>
          <Button colorScheme='teal' type='submit'>
            Create Account
          </Button>
          <Button onClick={() => navigate("/")} leftIcon={<ArrowBackIcon />}>
            Log In
          </Button>
        </ButtonGroup>
      </VStack>
    </Formik>
  );
};

export default SignUp;
