import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const Home = () => {
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [ success, setSuccess ] = useState(false)
  const [ error, setError ] = useState(false)
  const handleFileSelect = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
        setImagePreview(URL.createObjectURL(file)); // Create a preview URL
      };

      reader.readAsDataURL(file);
    }
  };


  const uploadImage = async (base64Image) => {
    try {
      // Remove the "data:image/png;base64," prefix
      const imageDataWithoutPrefix = base64Image.split(",")[1];

      const response = await axios.post(
        "https://bsgkjybfob.execute-api.us-west-2.amazonaws.com/prod/image-uploader",
        imageDataWithoutPrefix, // Send only the base64-encoded image data
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(imageDataWithoutPrefix, "image data without prefix");
      setSuccess(true)
      setImage(null)
      setImagePreview(null)

      console.log(response); // Handle the response from the server
    } catch (error) {
      console.error("Error uploading image:", error);
      setError(true)
    }
  };

  const handleImageUpload = () => {
    if (image) {
      uploadImage(image);
    }
  };

  return (
    <div className="mx-auto h-screen p-[2rem] ">
      <div className="flex justify-end">
        <Link to={"/images"} className="font-bold hover:text-slate-400">
          See My Images
        </Link>
      </div>
      <div className="flex items-center justify-center text-center h-full w-full">
        <div className="space-y-2 flex flex-col items-center">
          <h1 className="text-4xl font-bold">Image Uploader</h1>
          <p className="text-slate-400 mb-4">
            Upload an image! We only accept{" "}
            <span className="text-orange-500 font-bold">JPG</span> and{" "}
            <span className="text-orange-500 font-bold">PNG</span> files.
          </p>

          {image ? (
            <button
              className="bg-[#e74c3c] px-7 py-3 rounded-md hover:bg-orange-700 font-semibold cursor-pointer"
              id="uploadBtn"
              onClick={handleImageUpload}
            >
              Upload Image
            </button>
          ) : (
            <label
              htmlFor="fileInput"
              className="inline-block bg-[#e74c3c] px-7 py-3 rounded-md hover:bg-orange-700 font-semibold cursor-pointer"
              id="fileInputLabel"
            >
              Browse Files
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={(event) => handleFileSelect(event)}
              />
            </label>
          )}

          {image && (
            <img
              src={imagePreview}
              alt="User Image"
              className="object-cover z-10 rounded-full w-48 h-48 text-center "
            />
          )}
          {success && <p className="text-green-400 font-bold">Image Upload Success!</p>}
          {error && <p className="text-red-400 font-bold">Image Upload Error</p>}
        </div>
      </div>
    </div>
  );
};
