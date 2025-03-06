import { useState } from "react";
import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ChangeImageInPreferredPNProps {
  regNumber: number; // Adjust type if needed
}

export const ChangeImageInPreferredPN: React.FC<
  ChangeImageInPreferredPNProps
> = ({ regNumber }) => {
  const [, setIsModalOpen] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle image submission (inside the ChangeImageInPreferredPN component)
  const handleImageSubmit = async () => {
    if (selectedFile) {
      console.log(`Submitting new image for Reg Number: ${regNumber}`);
      console.log("File:", selectedFile);
      // Implement your upload logic here (e.g., upload to server, update database, etc.)
      setIsModalOpen(false); // Close the modal after submission
    } else {
      alert("Please select an image before submitting.");
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Change Product Image</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="border border-dashed border-gray-300 p-4 rounded-md">
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <span className="text-gray-500">
              Drag and drop an image here, or click to select
            </span>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          {selectedFile && (
            <div className="mt-2 text-sm text-gray-600">
              Selected: {selectedFile.name}
            </div>
          )}
        </div>
      </div>
      <DialogFooter>
        <Button onClick={handleImageSubmit}>Submit</Button>
      </DialogFooter>
    </>
  );
};
