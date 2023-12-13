import axios from "axios";
import { useEffect, useState } from "react";

export const Images = () => {
  const [image, setImage] = useState(null);
  const getImages = () => {
    axios
      .get(
        "https://08a4xi3fk0.execute-api.us-west-2.amazonaws.com/prod/image-uploader"
      )
      .then((res) => {
        setImage(res.data.images[0].data);
        console.log(res.data.images[0].data, "data");
      })
      .catch((error) => {
        console.log(error, " error");
      });
  };
  // useEffect(() => {
  //     getImages()
  // }, [])
  return (
    <>
      <button onClick={getImages} className="text-white text-4xl">
        Get images
      </button>
      {image && <img src={`data:image/png;base64,${image}`} alt="image" />}
    </>
  );
};
