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
            <div className={"mentionsContainer"}>
                <h2>Mentions légales</h2>
                <p>Chromatyk TCG est un site web axé sur le jeu de cartes à jouer et à collectionner Pokémon créé par Nintendo dans le but de faire un lien avec le stream de Chromatyk.</p>

                <p>Fondateur original : Pierre Schuvey (Chromatyk)</p>

                <p>Création du site : Pierre Schuvey (Chromatyk)</p>

                <p>« Les informations recueillies font l’objet d’un traitement informatique destiné à :</p>

                <p>
                    Vous identifier sur le site internet<br/>
                    Afficher publiquement le détail de votre collection, de vos recherches, vos possesions et votre pseudo<br/>
                    Le destinataire des données est le créateur du site. Aucune information personnelle n'est communiquée aux autres membres du site, tel que votre adresse e-mail.<br/>
                    Conformément à la loi « informatique et libertés » du 6 janvier 1978 modifiée en 2004, vous bénéficiez d’un droit d’accès et de rectification aux informations qui vous concernent, que vous pouvez exercer en vous adressant par mail à <button className={"mailButton"} onClick={() => window.location = 'mailto:chromatyk.contact@gmail.com'}>chromatyk.contact@gmail.com</button>
                </p>
                <p>Vous pouvez également, pour des motifs légitimes, vous opposer au traitement des données vous concernant.</p>

                <p>Les cookies assurent le bon fonctionnement du site. Ils peuvent être utilisés pour une authentification, une session, stocker une information spécifique comme vos préférences sur un site.</p>

                <p>Le contenu de ce site est protégé par le droit de la propriété intellectuelle.
                Toute duplication des textes ou images de ce site sans autorisation est interdite.</p>
            </div>
        </>
    );
}
export default Footer
