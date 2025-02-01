"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Code,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import {
  FaArrowRight,
  FaShareAlt,
  FaEnvelope,
  FaClipboard,
} from "react-icons/fa";
import Confetti from "react-confetti";
import { useSelector } from "react-redux";
import { userSelector } from "@/store/store";
import toast from "react-hot-toast";

export default function ChatbotIntegration() {
  const { currentOrg } = useSelector(userSelector);
  const [isIntegrationSuccessful, setIsIntegrationSuccessful] = useState<
    boolean | null
  >(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleTestIntegration = () => {
    // Simulate integration test (replace with actual API call)
    const isSuccess = Math.random() > 0.5; // Random success/failure
    setIsIntegrationSuccessful(isSuccess);
  };

  return (
    <div className="p-4 w-full ">
      <h2 className="text-xl font-bold mb-4">Chatbot Integration & Testing</h2>

      <div className=" flex gap-2 items-center justify-center md:flex-row flex-col">
        {/* Buttons */}
        <div className="space-y-4 bg-white shadow-lg p-4 rounded-lg md:h-[500px] flex flex-col items-center justify-center md:w-1/2">
          <h1 className="text-lg font-semibold">Options</h1>
          <Button
            onPress={() => {
              onOpen();
            }}
            className="w-fit bg-primary text-white hover:bg-secondary"
          >
            Open Preview
          </Button>

          <Button
            onPress={() => toast("See the intregation instructions")}
            className="w-fit bg-primary text-white hover:bg-secondary"
          >
            Integrate on Your Website
          </Button>

          <Button
            onPress={handleTestIntegration}
            className="w-fit bg-primary text-white hover:bg-secondary"
          >
            Test Integration
          </Button>
        </div>
        <div className="md:w-1/2">
          <div className="space-y-4 bg-white shadow-lg p-4 rounded-lg md:h-[500px] flex flex-col items-center justify-center md:w-full">
            <div className="text-lg font-semibold">Preview</div>
            <div>
              <div className="bg-white p-6 rounded-lg md:w-full ">
                <h3 className="text-lg font-bold mb-4">
                  Integration Instructions
                </h3>
                <p className="text-gray-700 mb-4">
                  Copy and paste the following code into the{" "}
                  <code>&lt;head&gt;</code> section of your website:
                </p>
                <div className="flex items-center justify-center">
                  <Code
                    lang="html"
                    className="text-wrap text-xs w-40 overflow-x-auto md:w-auto"
                  >
                    {`<script src="https://beyonder-chat.vercel.app/chatbot.js"></script>`}
                  </Code>

                  <Button
                    isIconOnly
                    variant="bordered"
                    onPress={() => {
                      navigator.clipboard.writeText(
                        `<script src="https://beyonder-chat.vercel.app/chatbot.js"></script>`
                      );
                      toast.success("Copied to clipboard");
                    }}
                    className="text-gray-700 ml-4 hover:text-primary w-fit"
                  >
                    <FaClipboard />
                  </Button>
                </div>

                <p className="text-gray-700 mb-4">
                  Or, email these instructions to your developer:
                </p>
              </div>
              <button
                onClick={() => {
                  window.location.href = `mailto:developer@example.com?subject=Chatbot Integration Instructions&body=Please add the following code to the <head> section of our website: %0D%0A%0D%0A<script src="https://example.com/chatbot.js"></script>`;
                }}
                className="w-fit mx-auto bg-primary text-white px-4 py-2 rounded-lg hover:bg-indigo-600 flex items-center justify-center"
              >
                <FaEnvelope className="mr-2" />
                Email Instructions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success UI */}
      {isIntegrationSuccessful === true && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md text-center">
            <Confetti width={window.innerWidth} height={window.innerHeight} />
            <h3 className="text-lg font-bold mb-4">Integration Successful!</h3>
            <p className="text-gray-700 mb-6">
              Your chatbot has been successfully integrated.
            </p>
            <div className="space-y-4">
              <Button
                onPress={() => {
                  setIsIntegrationSuccessful(null);
                }}
                className="w-full bg-primary text-white hover:bg-secondary"
              >
                Explore Admin Panel
              </Button>
              <Button
                onPress={() => {
                  setIsIntegrationSuccessful(null);
                }}
                className="w-full bg-primary text-white hover:bg-secondary"
              >
                Start Talking to Your Chatbot
              </Button>
              <div className="flex items-center justify-center space-x-4">
                <button className="text-gray-700 hover:text-primary">
                  <FaShareAlt size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Failure UI */}
      {isIntegrationSuccessful === false && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md text-center">
            <h3 className="text-lg font-bold mb-4">Integration Not Detected</h3>
            <p className="text-gray-700 mb-6">
              We couldn't detect the chatbot integration. Please ensure the code
              has been added correctly.
            </p>
            <button
              onClick={() => setIsIntegrationSuccessful(null)}
              className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <Modal
          backdrop="blur"
          size="full"
          isOpen={isOpen}
          placement="top-center"
          onOpenChange={onOpenChange}
        >
          <ModalContent className="">
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <p className="text-gray-600">
                    This is how Beyonder will look on your website
                  </p>
                  <small className="font-medium">
                    Chatbot not working as intended?{" "}
                    <span className="underline cursor-pointer">
                      Share Feedback
                    </span>
                  </small>
                </ModalHeader>
                <ModalBody>
                  <iframe
                    id="chatbot-iframe"
                    src={currentOrg?.url}
                    className="w-full h-full"
                  ></iframe>
                  <div className="flex items-center justify-between mt-4">
                    <Button
                      onPress={onClose}
                      className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                    >
                      Close
                    </Button>
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
