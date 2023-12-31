import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Images = () => {
  const [image, setImage] = useState(null);
  const getImages = () => {
    axios
    .get(
      "https://bsgkjybfob.execute-api.us-west-2.amazonaws.com/prod/image-uploader"
    )
    .then((res) => {
     
      console.log(res.data, 'response')
      // const responseData = JSON.parse(res.data);
      // const getImages = res.data.images.map((image) => image)

      // console.log(getImages, 'my images')
     setImage(res.data.images)
    })
    .catch((error) => {
      console.log(error, " error");
    });
  };
  useEffect(() => {
      getImages()
  }, [])
  return (
    <>
     

      <div className="mx-auto h-screen p-[2rem] ">
      <div className="flex justify-end">
        <Link to={"/"} className="font-bold hover:text-slate-400">
          Upload an Image
        </Link>
      </div>
      
      <div className="flex   h-full items-center justify-center gap-x-6 w-full">
        {image?.map((image, index) => (
              <img
                key={index}
                src={`data:image/png;base64,${image.data}`}
                alt={`image-${index}`}
                className="h-48 w-48 object-cover"
              />
            ))}
        </div>
    </div>
    </>
  );
};
