import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'
import PkmList from './pkmList.js'
function HomePage() {

const [pseudo,setPseudo] = useState("");
const [list,setList] = useState([]);
const submitPost = () => {
    Axios
      .get(`https://chromatyk-pokemon.herokuapp.com/api/getByUser/${pseudo}`)
      .then(function(response){
          setList(response.data);
    })
}
    return (
      <>
        <div className="CreatePost">
          <div className="uploadPost">
              <input type="text" placeholder="Pseudo" placeh onChange={(e)=> {
                  setPseudo(e.target.value)
              }}/>
              <button onClick={submitPost}>Submit Post</button>
          </div>
        </div>
        <div>
        <PkmList list={list}/>
        </div>
      </>
    )
}

export default HomePage
