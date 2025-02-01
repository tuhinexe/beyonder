"use client";

import { userSelector } from "@/store/store";
import { Button } from "@heroui/react";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function ScrapingProgress() {
  const { currentOrg } = useSelector(userSelector);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="p-4 w-[90vw] md:w-full overflow-hidden">
      <h2 className="text-xl font-bold mb-4">Scraping Progress</h2>

      {/* Scrollable Table Container */}
      <div className="overflow-x-auto max-w-[95%]">
        <table className="w-full border-collapse min-w-[600px] overflow-x-auto max-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Company Name</th>
              <th className="p-2 border">URL</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Meta Tags</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50 cursor-pointer">
              <td className="p-2 border text-center">{currentOrg?.name}</td>
              <td className="p-2 border text-center">{currentOrg?.url}</td>
              <td className="p-2 border text-center">
                {currentOrg?.description || "no description"}
              </td>
              <td className="p-2 border text-center">
                <Button
                  onPress={() => setShowDetails(true)}
                  variant="bordered"
                  endContent={
                    <FaArrowRight className="group-hover:translate-x-1 transition-all duration-150 ease-in-out" />
                  }
                  className="bg-white shadow-lg text-primary group border-primary hover:bg-primary hover:text-white transition-all duration-300 ease-in-out"
                >
                  See Details
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal for Scraped Data */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 "
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-lg max-h-[80vh] overflow-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Scraped Data: {currentOrg?.name}
                </h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Scraped Data List */}
              <ul className="space-y-3">
                {Object.keys(currentOrg?.metaTags || {}).map((tag) => (
                  <li key={tag} className="bg-gray-50 p-3 rounded-lg">
                    <strong className="text-primary">{tag}:</strong>{" "}
                    <span className="text-gray-700">
                      {currentOrg?.metaTags[tag]}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setShowDetails(false)}
                className="mt-6 w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-all duration-300"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
