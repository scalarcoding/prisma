import { supabase } from "@/api/repository/supabase";
import { toast } from "sonner";

const uploadImageGeneral = async (file: File, bucketName: string, fullPath: string) => {
    const { data, error } = await supabase.storage.from(bucketName).upload(fullPath, file,  {
      cacheControl: '3600', // optional, set cache control if needed
      upsert: true // Enable overwriting existing file
    });
  
    if (error) {
      toast.error(`Error uploading file: ${error.message}`)
      return null
    }
    console.log('Upload successful:', data);
    return file;
  };
  
  
  const uploadImageGeneralGetUrl = async (file: File, bucketName: string, fullPath: string): Promise<string | null> => {
    // Upload the file to the Supabase storage bucket
    const { data, error } = await supabase.storage.from(bucketName).upload(fullPath, file, {
      cacheControl: '3600', // optional, set cache control if needed
      upsert: true // Enable overwriting existing file
    });
  
    // Handle any error that occurred during the upload
    if (error) {
      console.error(`Error uploading file: ${error.message}`);
      return null;
    }
  
    // Generate the public URL for the uploaded image
    const { data: publicData } = supabase.storage.from(bucketName).getPublicUrl(fullPath);
  
    // Check if publicUrl exists in the response
    if (!publicData || !publicData.publicUrl) {
      toast.error('Error generating file URL');
      return null;
    }
  
    console.log('Upload successful:', data);
  
    // Return the URL of the uploaded image
    return publicData.publicUrl;
  };

  export { uploadImageGeneral, uploadImageGeneralGetUrl };