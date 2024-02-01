import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/modal";
import { Button, ModalOverlay } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import TextField from "./Login/TextField";
import * as Yup from "yup";

const AddFriendModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a friend!</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ friendName: "" }}
          onSubmit={(values) => {
            onClose();
          }}
          validationSchema={Yup.object({
            friendName: Yup.string()
              .required("Username required")
              .min(6, "Invalid username!")
              .max(28, "Invalid username!"),
          })}
        >
          <Form>
            <ModalBody>
              <TextField
                label="Friend's name"
                placeholder="Enter friend's username.."
                autoComplete='off'
                name='friendName'
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' type='submit'>
                Submit
              </Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default AddFriendModal;
