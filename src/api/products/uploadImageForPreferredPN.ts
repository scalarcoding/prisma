import { uploadImageGeneralGetUrl } from "@/services/image_uploader";
import { supabase } from "../repository/supabase";

// Function to upload the image to Supabase and update the img_url


const uploadImageForPreferredPN = async (file: File, reg_number: number) => {
  const fileName = `${reg_number.toString()}_${new Date().toISOString()}`;
  const bucketName = 'img/products'; // Replace with your Supabase bucket name


  console.log(bucketName);


  try {
    // Step 1: Upload the image to Supabase storage
    const img_url = await uploadImageGeneralGetUrl(file, bucketName, fileName)

    if (!img_url) {
      throw new Error("Error uploading image to Supabase storage");
    }

    console.log("File uploaded successfully:");


    // Step 3: Update the img_url in the pn_preference table
    await updateProductImageURL(img_url, reg_number);
  } catch (error) {
    console.error("Error in image upload process:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

// Function to update the img_url in the pn_preference table
const updateProductImageURL = async (imageUrl: string, reg_number: number) => {
  try {
    const { data, error } = await supabase
      .from("pn_preference")
      .update({ img_url: imageUrl })
      .match({ reg_number: reg_number, preference: "01" });

    if (error) {
      throw error;
    }

    console.log("Image URL updated successfully in the table:", data);
  } catch (error) {
    console.error("Error updating img_url in pn_preference table:", error);
  }
};


export { uploadImageForPreferredPN, updateProductImageURL };