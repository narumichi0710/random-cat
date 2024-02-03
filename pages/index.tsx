import { NextPage } from "next";
import { useEffect, useState } from "react";
 
const IndexPage: NextPage = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const handleClick = () => {
        if (loading) {
            return;
        }

        setLoading(true);
        fetchImage().then((image) => {
            setImageUrl(image.url);
            setLoading(false);
        });
    }

    useEffect(() => {
        fetchImage().then((image) => {
          setImageUrl(image.url); 
          setLoading(false);
        });
     }, []);
  return (
    <div>
        <button onClick={handleClick}>他のにゃんこも見る</button>
        <div>{loading || <img src={imageUrl} />}</div>
    </div>
  );

};
export default IndexPage;

type Image = { url: string; };
  
const fetchImage = async (): Promise<Image> => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const images = await res.json();
    console.log(images);
    return images[0];
  };