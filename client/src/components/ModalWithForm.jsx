import { useDisclosure, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react";

import PasswordForgotForm from "./PasswordForgotForm";

// Modal from https://chakra-ui.com/docs/components/modal

export default function ModalWithForm() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Text color={'blue.400'} onClick={onOpen}>Forgot password?</Text>
      {/* <Button >Open Modal</Button> */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          
          {/* <ModalHeader>Forgot your password?</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <PasswordForgotForm />
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  )
}