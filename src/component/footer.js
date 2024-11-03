import React,{useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import CreateTrade from './createTrade.js';
import NbProposition from './nbProposition.js';
import '../App.css'
import moment from 'moment';

function Footer(props) {
      return (
        <>
          <div className={"footerContainer"}>
            <p>© 2023 Pokémon. © 1995–2023 Nintendo/Creatures Inc./GAME FREAK Inc. est une marque déposée par Nintendo</p>
            <p>© Chromatyk 2023</p>
              <Link className="navLink mentionLink" to="/Mentions">Mentions légales</Link>
          </div>
        </>
      );
  }
export default Footer
