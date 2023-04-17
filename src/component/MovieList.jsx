import React, { useEffect, useState } from "react";
import "./MovieList.css";
import { Auth } from "./Auth";
import { db, auth, storage } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isReceiveOscar, setIsReceiveOscar] = useState(false);

  const [updateTitle, setUpdateTitle] = useState("");

  const [fileUpload, setFileUpload] = useState(null);
  const movieCollectionRef = collection(db, "movie");

  
  const getMovieList = async () => {
    try {
      const data = await getDocs(movieCollectionRef);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filterData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      setNewMovieTitle("");
      setNewReleaseDate(0);
      setIsReceiveOscar(false);
      await addDoc(movieCollectionRef, {
        title: newMovieTitle,
        ReleaseDate: newReleaseDate,
        receiveOscar: isReceiveOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMovie = async (id) => {
    // console.log(id);
    const movieDoc = doc(db, "movie", id);
    await deleteDoc(movieDoc);
    getMovieList();
  };
  const updateMovieTitle = async (id) => {
    // console.log(id);
    const movieDoc = doc(db, "movie", id);
    await updateDoc(movieDoc, { title: updateTitle });
    getMovieList();
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="title">
        <input
          value={newMovieTitle}
          className="title_movieTitle"
          placeholder="  MovieTitle"
          onChange={(e) => {
            setNewMovieTitle(e.target.value);
          }}
        />
        <input
              value={newReleaseDate}
          className="title_movieDate"
          placeholder="  Release Date"
          type="number"
          onChange={(e) => {
            setNewReleaseDate(Number(e.target.value));
          }}
        />
        <div className="title_movieOscar">
          <input
            
            type="checkbox"
            checked={isReceiveOscar}
            onChange={(e) => {
              setIsReceiveOscar(e.target.checked);
            }}
          />
          <label>Oscar</label>
        </div>

        <button className="title_moviebutton" onClick={onSubmitMovie}>
          submit Movie
        </button>
      </div>
      <div className="file">
        <input
      
          className="file_input"
          type="file"
          onChange={(e) => {
            setFileUpload(e.target.files[0]);
          }}
        />
        <button className="file_button" onClick={uploadFile}>
          Upload Files
        </button>
      </div>
      <div className="movielist">
        {movieList.map((movie) => {
          return (
            <div className="movie">
              <p
                className="movie_title"
                style={{
                  color: movie.receiveOscar ? "#ffff" : "rgb(255, 234, 0)",
                }}
              >
                {movie.title}
              </p>
              <p className="movie_date">{movie.ReleaseDate}</p>
              <button
                className="movie_delete"
                onClick={() => {
                  deleteMovie(movie.id);
                }}
              >
                Delete
              </button>
              <input
                className="movie_ititle"
                placeholder="  Movie title "
                onChange={(e) => {
                  setUpdateTitle(e.target.value);
                }}
              />
              <button
                className="movie_update"
                onClick={() => {
                  updateMovieTitle(movie.id);
                }}
              >
                update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieList;
