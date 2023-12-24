import React from 'react'
import {useState,useEffect} from "react";
import { Link } from 'react-router-dom';

const Anime=()=> {
    const serverUrl= import.meta.env.VITE_SERVER_URL;

    const baseurl=`${import.meta.env.VITE_SERVER_URL}/api/anime`;
    const [data,setData]=useState([]);
    const [isloading,setIsloading]=useState(true);
    const [selectcategory,setSelectcategory]=useState("");
    useEffect(()=>{
        const fetchData=async()=>{
            
            try{
                     
                let url= baseurl;
                if(selectcategory){
                    url += `?category=${selectcategory}`
                }

                const response = await fetch(url);
                if(!response.ok){
                    throw new Error("Failed to fetch the data");
                }
                const jsonData= await response.json();
                setData(jsonData);
                  setIsloading(false);

            }catch(error){
                  console.log(error);
                  setIsloading(false);
            }
        }
        fetchData();
    },[selectcategory])

  return (
    <div>
        <h1>
            Anime
        </h1>
        <p>
            This page contains the fetched data from the database
        </p>

        <Link to="/createanime"> +Add New Anime</Link>
        <h2>Fetch Examples</h2>
        <div className="filters">
            <level>Categories</level>
            <select onChange={(e)=>setSelectcategory(e.target.value)}>
                <option value="">All</option>
                <option value="adventure">Adventure</option>
                <option value="action">Action</option>
                <option value="drama">Drama</option>
                <option value="fantasy">Fantasy</option>
                <option value="horror">Horror</option>
                <option value="sports">Sports</option>
               
                
                
                


            </select>
        </div>
       

        { 
          
         isloading ? (
            <p>Loading....</p>
         ):(
          
            <ul className="animes">
                {data.map((item)=>(
                    
                    <li key={item._id}>
                     <Link to={`/anime/${item.slug}`}>
                        <img src={`${serverUrl}/uploads/${item.thumbnail}`} alt={item.title}/>
                        <h3>{item.title}</h3>
                     </Link>
                    </li>
                ))}

            </ul>


         )


        }
      
    </div>
  );
}

export default Anime
