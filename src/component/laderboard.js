import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'
import PkmList from './pkmList.js'

function LaderBoard(props) {
    const [laderBoard,setLaderboard] = useState([]);
    const [topThree,setTopThree] = useState([]);
    const [others,setOthers] = useState([]);
    const pseudo = props.cookies.user.data[0].login;
    function displayNormalLaderboard(e) {
      let shiny = e.target.value;
        Axios
          .get(`/api/getLaderboard/0`)
          .then(function(response){
              setLaderboard(response.data);
              setTopThree(response.data.slice(0,3));
              setOthers(response.data.slice(3));
        })
    }
    function displayShinyLaderboard(e) {
      let shiny = e.target.value;
        Axios
          .get(`/api/getLaderboard/1`)
          .then(function(response){
              setLaderboard(response.data);
              setTopThree(response.data.slice(0,3));
              setOthers(response.data.slice(3));
        })
    }
    return (
      <>
        <div className="leaderBoardSwitch">
            <button value="0" onClick={displayNormalLaderboard}>Global</button>
            <button value="1" onClick={displayShinyLaderboard}>Shiny</button>
        </div>
        <div className="center">
        {topThree.length > 0 &&
          <>
          <div className="top3Desktop">
            {topThree.length > 1 &&
              <div className="two item">
                <div className="pos">
                  2
                </div>
                <div className="picTwo pic"></div>
                <div className="name">
                  {topThree[1].pseudo}
                </div>
                <hr/>
                <div className="score">
                  {topThree[1].nbCapture}
                </div>
              </div>
            }
            <div className="one item">
              <div className="pos">
                1
              </div>
              <div className="picOne pic"></div>
              <div className="name">
                {topThree[0].pseudo}
              </div>
              <hr/>
              <div className="score">
                {topThree[0].nbCapture}
              </div>
            </div>
            {topThree.length > 2 &&
            <div className="three item">
              <div className="pos">
                3
              </div>
              <div className="picThree pic"></div>
              <div className="name">
                {topThree[2].pseudo}
              </div>
              <hr/>
              <div className="score">
                {topThree[2].nbCapture}
              </div>
            </div>
            }
          </div>
            <div className="top3Mobile">
              <div class="itemOne">
                <div class="pic picOne"></div>
                <div class="name">
                  {topThree[0].pseudo}
                </div>
                <div class="score">
                  {topThree[0].nbCapture}
                </div>
              </div>
              {topThree.length > 1 &&
                <div class="itemTwo">
                  <div class="pic picTwo"></div>
                  <div class="name">
                    {topThree[1].pseudo}
                  </div>
                  <div class="score">
                    {topThree[1].nbCapture}
                  </div>
                </div>
              }
              {topThree.length > 2 &&
                <div class="itemThree">
                  <div class="pic picThree"></div>
                  <div class="name">
                    {topThree[2].pseudo}
                  </div>
                  <div class="score">
                    {topThree[2].nbCapture}
                  </div>
                </div>
              }
            </div>
          </>
        }
        <div class="list">
        {others.length > 0 &&
          others.map((val, key) => {
          return pseudo == val.pseudo &&
            <div className="item myItem">
              <div className="pic"><p>#{key + 4}</p></div>
              <div className="name">
                {val.pseudo}
              </div>
              <div className="score">
                {val.nbCapture}
              </div>
            </div>
         })
        }
        {others.length > 0 &&
          others.map((val, key) => {
          return pseudo == val.pseudo ?
            <div className="item myItem">
              <div className="pic"><p>#{key + 4}</p></div>
              <div className="name">
                {val.pseudo}
              </div>
              <div className="score">
                {val.nbCapture}
              </div>
            </div>
            :
            <div className="item">
              <div className="pic"><p>#{key + 4}</p></div>
              <div className="name">
                {val.pseudo}
              </div>
              <div className="score">
                {val.nbCapture}
              </div>
            </div>
         })
        }
          </div>
    </div>
      </>
    )
}

export default LaderBoard
