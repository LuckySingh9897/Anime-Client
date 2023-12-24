import React from 'react'
import {useState,useEffect} from "react";
import { Link , useParams} from 'react-router-dom';

function Singleanime() {
  const serverUrl= import.meta.env.VITE_SERVER_URL;
    const [data,setData]=useState([]);
    const useSlug= useParams();
    const baseurl=`${serverUrl}/api/anime/${useSlug.slug}`;

    function StarRating({numberofstars}){
                const stars=[];
                for(let i=0;i<numberofstars;i++){
                  stars.push(<span key={i}>⭐</span>)
                }

                return <div>Rating : {stars}</div>
    }
    useEffect(()=>{
        const fetchData=async()=>{
            
            try{
                     
               
                const response = await fetch(baseurl);
                if(!response.ok){
                    throw new Error("Failed to fetch the data");
                }
                const jsonData= await response.json();
                setData(jsonData);
                 

            }catch(error){
                  console.log(error);
                 
            }
        }
        fetchData();
    },[])

  return (
    <div>
      <Link to={"/anime"}>Anime</Link>
      <div className="animedetails">

      
      <div className="col-1">
        <img src={`${serverUrl}/uploads/${data.thumbnail}`} alt={data.title} className="center"/>
       
        <Link to={`/editAnime/${data.slug}`}>Edit</Link>
      </div>
      <div className="col-2">
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        <StarRating numberofstars={data.stars}/>
        <p>Category</p>
        <ul>
          {data.category?.map((item,index)=>(
            <li key= {index}>{item}</li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  )
}

export default Singleanime
