import React, { useState } from "react";
import noimageSelected from "../../assets/th.jpeg";

function createAnime() {
  const serverUrl= import.meta.env.VITE_SERVER_URL;
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [image,setImage]= useState(noimageSelected);
  const [thumbnail,setThumbnail]=useState(null);

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
    formData.append("title",title);
    formData.append("slug",slug);
    formData.append("stars",stars);
    formData.append("category",category);
    formData.append("description",description);
    formData.append("thumbnail",thumbnail);




    try {


        const response = await  fetch(`${serverUrl}/api/anime`,{
            method: "POST",
            body: formData,
        })




    //   const response = await fetch("http://localhost:8000/api/anime", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       title: title,
    //       slug: slug,
    //       stars: stars,
    //       description: description,
    //       category: category,
    //     }),
    //   });
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
  return (
    <div>
      <h1>Add Anime</h1>

      {submitted ? (
        <p>Data Submitted Successfully</p>
      ) : (
        <form onSubmit={createAnime}>
          <div className="animedetails">

            <div className="col-1">
              <level>Upload Thumbnail</level>
              <img src={image} alt="preview-image" />
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

export default createAnime;
