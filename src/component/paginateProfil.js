import React,{useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import {BrowserRouter, Link} from "react-router-dom";
import { Tooltip } from 'react-tooltip'
import { Cookies, useCookies } from 'react-cookie';
import Axios from 'axios'
import moment from 'moment';

function Items(props) {
    const profilList = props.currentItems;
    return (
        <>
            <div className="pokemonGlobalContainer">
                {profilList == [] ? (
                    <h1>Loading...</h1>
                ) : (
                    profilList.map((val, key) => {
                        return (
                            <>
                                <div style={{background:"rgba(0,0,0,.5)",borderRadius:"50px",padding:"20px"}}>
                                    <p className={"pseudoProfilList"}>{val.pseudo}</p>
                                    <p className={"levelProfilList"}>Niveau {val.level} <small>( {val.xp} xp )</small></p>
                                    <div className={"profilVisualsList"}>
                                        <div
                                            style={{backgroundImage: val.first_pokemon ? 'url(' + val.first_pokemon + ')' : 'url(/images/random.png)'}}
                                            value={"first_pokemon"}
                                            className="anchorTooltip uniquePokemonContainerTeam">
                                        </div>
                                        <div
                                            style={{backgroundImage: val.second_pokemon ? 'url(' + val.second_pokemon + ')' : 'url(/images/random.png)'}}
                                            value={"second_pokemon"}
                                            className="anchorTooltip uniquePokemonContainerTeam middlePokemonProfilList">
                                        </div>
                                        <div
                                            style={{backgroundImage: val.third_pokemon ? 'url(' + val.third_pokemon + ')' : 'url(/images/random.png)'}}
                                            value={"third_pokemon"}
                                            className="anchorTooltip uniquePokemonContainerTeam closePokemonProfilList">
                                        </div>
                                        <div style={{width: "150px"}} className="anchorTooltip uniquePokemonContainer">
                                            {val.profil_picture ?
                                                <img style={{width: "100%"}}
                                                     src={"/images/Trainers/Trainer" + val.profil_picture + ".png"}/>
                                                :
                                                <img style={{width: "100%"}} src={"/images/random.png"}/>
                                            }
                                        </div>
                                        <div
                                            style={{backgroundImage: val.fourth_pokemon ? 'url(' + val.fourth_pokemon + ')' : 'url(/images/random.png)'}}
                                            value={"fourth_pokemon"}
                                            className="anchorTooltip uniquePokemonContainerTeam closePokemonProfilList">
                                        </div>
                                        <div
                                            style={{backgroundImage: val.fifth_pokemon ? 'url(' + val.fifth_pokemon + ')' : 'url(/images/random.png)'}}
                                            value={"fifth_pokemon"}
                                            className="anchorTooltip uniquePokemonContainerTeam middlePokemonProfilList">
                                        </div>
                                        <div
                                            style={{backgroundImage: val.sixth_pokemon ? 'url(' + val.sixth_pokemon + ')' : 'url(/images/random.png)'}}
                                            value={"sixth_pokemon"}
                                            className="anchorTooltip uniquePokemonContainerTeam">
                                        </div>
                                    </div>
                                    <div className={"linkList"}>
                                        <Link className="navLink linkFromNav" to={"/pokedex/"+val.pseudo}><img src={"/images/pokedex.png"}/></Link>
                                        <Link className="navLink linkFromNav" to={"/profil/"+val.pseudo}><img src={"/images/card.png"}/></Link>
                                    </div>
                                </div>
                            </>
                        )
                    })
                )}
                <Tooltip anchorSelect=".anchorTooltip"/>
            </div>
        </>
    );
}

function PaginationProfil(props) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + props.itemsPerPage;
    const currentItems = props.items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(props.items.length / props.itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * props.itemsPerPage) % props.items.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <Items currentItems={currentItems}/>
            <ReactPaginate
                className="paginateLay"
                breakLabel="..."
                nextLabel=">>"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel="<<"
                renderOnZeroPageCount={null}
            />
        </>
    );
}

export default PaginationProfil;
