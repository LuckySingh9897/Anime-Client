import React from 'react'
import { useState,useEffect } from "react";
import {Link, useParams,useNavigate} from "react-router-dom"
import noimageSelected from "../../assets/th.jpeg";
function editAnime() {
  const serverUrl= import.meta.env.VITE_SERVER_URL;

    const navigate= useNavigate();
    const urlslug= useParams();
    const baseUrl=`${serverUrl}/api/anime/${urlslug.slug}`;
    const [animeId, setAnimeId]= useState("");
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [stars, setStars] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [image,setImage]= useState("");
    const [thumbnail,setThumbnail]=useState(null);



 const fetchData =async()=>{
    try{
        const response= await fetch(baseUrl);
        if(!response.ok)
        {
            throw new Error("Failed to load resources");
        }
        const data=  await response.json();
        setTitle(data.title);
        setSlug(data.slug);
        setStars(data.stars);
        setDescription(data.description);
        setCategory(data.category);
        setThumbnail(data.thumbnail);
          setAnimeId(data._id);



    }catch(error){
        console.log(error);
        
    }
 }

useEffect(()=>{
 fetchData();
},[])


  
    const handleCategoryChange = (e) => {
      setCategory(e.target.value.split(",").map((category) => category.trim()));
    };
  
    const onImageChange=(e)=>{
      if(e.target.files && e.target.files[0]){
          setImage(URL.createObjectURL(e.target.files[0]));
          setThumbnail(e.target.files[0]);
      }
    }
  
    const createAnime = async (e) => {
      e.preventDefault();
  
      const formData= new FormData();
      formData.append("_id",animeId);
      formData.append("title",title);
      formData.append("slug",slug);
      formData.append("stars",stars);
      formData.append("category",category);
      formData.append("description",description);

         if(thumbnail){
      formData.append("thumbnail",thumbnail);
  
         }
  
  
      try {
  
  
          const response = await  fetch(`${serverUrl}/api/anime`,{
              method: "PUT",
              body: formData,
          })
  
  
      
        if (response.ok) {
          setSubmitted(true);
          setTitle("");
          setStars(0);
          setSlug("");
          setDescription("");
          setCategory([]);
          
        } else {
          console.log("Failed to submit data");
        }
      } catch (error) {
        console.log(error);
      }
    };
    const removeAnime=async(e)=>{
        e.preventDefault();
        try{

const response= await fetch (`${serverUrl}/api/anime/`+animeId,{
    method: "DELETE"
})
if(response.ok){
    navigate("/anime");
    console.log("Anime Removed");
}

        }catch(error){
            console.log(error);
        }

    }
    return (
      <div>
        <h1>Edit Anime</h1>
           
         <button onClick={removeAnime} className="delete">
            Delete Anime
            </button>  
        {submitted ? (
          <p>Data Submitted Successfully</p>
        ) : (
          <form onSubmit={createAnime}>
            <div className="animedetails">
  
              <div className="col-1">

                <level>Upload Thumbnail</level>

                {image ? (
                     <img src={`${image}`} alt="preview-image" />
                ):(
                <img src={`${serverUrl}/uploads/${thumbnail}`} alt="preview-image" />
                )}
                

                <input onChange={onImageChange}  type="file" accept="image/gif , image/jpeg , image/png" />
              </div>
              <div className="col-2">
                <div>
                  <label>Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
  
                <div>
                  <label>Description</label>
                  <textarea
                    row="5"
                    cols="50"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
  
                <div>
                  <label>Stars</label>
                  <input
                    type="number"
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                  />
                </div>
  
                <div>
                  <label>Slug</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </div>
  
                <div>
                  <label>Category (coma-seperated)</label>
                  <input
                    type="text"
                    value={category}
                    onChange={handleCategoryChange}
                  />
                </div>
                <input type="submit"></input>
              </div>
             
            </div>
          </form>
        )}
      </div>
    );
}

export default editAnime
