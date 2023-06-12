import { useEffect, useState } from "react";
import Authi from "./component/Authi";
import { db, auth,storage } from "./config/firebase";
import { getDocs, collection, addDoc, deleteDoc,updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
function App() {
  const [movieList,setMovieList]= useState([]);

  const [newMovie,setNewMovie]=useState("")
  const [newReleaseData,setReleaseDate]=useState("")
  const [updatedName, setUpdatedName]=useState("");
  const [file,setFile]=useState(null);



  const movieCollRef=collection(db,'movies');
  const getMovieList = async()=>{
    try{
      const data= await getDocs(movieCollRef);
      const grabbedData = data.docs.map((doc)=>({
        ...doc.data(), id: doc.id}))
      setMovieList(grabbedData)
    } catch(e){
      console.error(e);
    }
      
  }
  useEffect(()=>{
  
    getMovieList();
  },[])
 const submitMovie=async()=>{
  try{
    await addDoc(movieCollRef, {
      name:newMovie, releaseDate:newReleaseData, userId:auth?.currentUser.uid
    });
    getMovieList()
  }catch(e){
    console.error(e)
  }
 };
 const deleteMovie=async(id)=>{
  const movieDoc= doc(db,"movies", id)
    
      
      await deleteDoc(movieDoc);
    getMovieList()
 }
 const updateMovie=async(id)=>{
  const movieDoc= doc(db,"movies", id)
    
      
      await updateDoc(movieDoc, {name:updatedName});
    getMovieList()
 }

const uploadFile= async()=>{
  if(!file) return;
  const fileFolderRef=ref(storage, `project/${file.name}`);
  try{
    await uploadBytes(fileFolderRef, file)
  } catch(e){
    console.error(e)
  }
  
}

  return (
    <div className="App text-center font-bold text-7xl text-cyan-700 capitalize">
      hey firebase
      <Authi></Authi>

      <div className="text-xl text-white font-normal pt-10 flex gap-4 justify-center" >
        <input className="bg-gray-600 p-2" onChange={(e)=>setNewMovie(e.target.value)} placeholder="Movie name"></input>
        <input className="bg-gray-600 font-normal p-2" onChange={(e)=>setReleaseDate ( e.target.value)} placeholder="Relase date" type="number" ></input>
        <button className='bg-blue-600 text-white px-3 py-1 rounded-md' onClick={submitMovie}> Submit movie</button>
      </div>
      <div>
        {movieList.map((movie)=>(
          
          <div className="text-[#c53636] text-3xl mt-12 gap-2 justify-center">
         <div>
         <h1>{movie.name}</h1>
          <h1 className="font-semibold text-blue-400 mb-4 ">Date:{movie.releaseDate}</h1>
         </div>
          <div className="text-xl flex gap-4 justify-center">
          <button onClick={()=>deleteMovie(movie.id)} className='bg-blue-600 text-white px-3 py-1 rounded-md flex justify-center self-center w-[200px]'>Delete Movie</button>
          <input onChange={(e)=>setUpdatedName(e.target.value)} className="bg-gray-600 font-normal p-2 flex  self-center" placeholder="update name"></input>
          <button onClick={()=>updateMovie(movie.id)} className='bg-blue-600 text-white px-3 py-1 rounded-md flex justify-center self-center w-[200px]'>Update Movie</button>
          </div>
          
          </div>
      
        ))}
      </div>
      <div className="text-xl flex gap-4 justify-center mt-10">
        <input type="file" onChange={(e)=>setFile(e.target.files[0])}></input>
        <button onClick={uploadFile}>Submit</button>
      </div>
    </div>
  );
}

export default App;
