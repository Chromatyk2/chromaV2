import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import MyCardsSet from './myCardSet.js';
import MyUniqueBooster from "./myUniqueBooster";
import ProgressBarCard from "./progressBarCard";

function MyCards(props) {
    const [nbCards, setNbCards] = useState(null);
    const [nbCard, setNbCard] = useState(null);
    const [totalCard, setTotalCard] = useState(null);
    const [totalCardUser, setTotalCardUser] = useState(null);
    const [boosterList, setBoosterList] = useState(null);
    const [page, setPage] = useState(null);
    const [guruName, setGuruName] = useState(null);
    function displayPage(e,f,g) {
        setPage(e);
        setNbCard(f);
        setGuruName(g);
    }
    function backPage() {
        setPage(null)
    }
    useEffect(() => {
        Axios
            .get("/api/getNbCards/"+props.user)
            .then(function(response){
                setNbCards(response.data);
                let sum = (response.data.reduce(function(prev, current) {
                    return prev + +current.nbCard
                }, 0));
                setTotalCardUser(sum);
                Axios.get("/api/getBoosterTotalCard")
                    .then(function(response){
                        setBoosterList(response.data);
                        let sumBooster = (response.data.reduce(function(prev, current) {
                            return prev + +current.totalCards
                        }, 0));
                        setTotalCard(sumBooster);
                    })
            })
    }, [])
    return (
        <>
            {totalCard &&
                !page &&
                <ProgressBarCard getNb={totalCardUser} item={totalCard}/>
            }
            <div id={"cardsContainer"}>
                {totalCard &&
                    page ?
                        <>
                            <button style={{color:"white",width:"100%",margin:"0",padding:"0",marginTop:"30px"}}onClick={backPage} className="backButton">Retour</button>
                            <MyCardsSet user={props.user} card={nbCard} idBooster={page} guruName={guruName}/>
                        </>
                    :
                        nbCards &&
                            totalCard &&
                                nbCards.sort((a, b) => b.nbCard - a.nbCard).map((val, key) => {
                                return(
                                    <MyUniqueBooster page={val.booster} change = {displayPage} nbCard={val} boosterList={boosterList} maxBooster={boosterList.find((uc) => uc.name == val.booster).totalCards}/>
                                )
                            })
                }
            </div>
        </>
    )
}
export default MyCards
