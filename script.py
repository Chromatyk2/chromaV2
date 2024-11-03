import requests
from bs4 import BeautifulSoup
import json
pokemons_fr = [
              "Poussacha", "Matourgeon", "Miascarade", "Chochodile", "Crocogril",
                  "Flâmigator", "Coiffeton", "Canarbello", "Palmaval", "Gourmelet",
                  "Fragroin", "Fragroin", "Tissenboule", "Filentrappe", "Lilliterelle",
                  "Gambex", "Pohm", "Pohmotte", "Pohmarmotte", "Compagnol",
                  "Famignol", "Pâtachiot", "Briochien", "Olivini",
                  "Olivado", "Arboliva", "Tapatoès", "Selutin", "Amassel", "Gigansel", "Charbambin", "Carmadura",
                  "Malvalame", "Têtampoule", "Ampibidou", "Zapétrel", "Fulgulairo", "Grondogue",
                  "Dogrino", "Gribouraigne", "Tag-Tag", "Virovent", "Virevorreur",
                  "Terracool", "Terracruel", "Craparoi", "Pimito", "Scovilain",
                  "Léboulérou", "Bérasca", "Flotillon", "Cléopsytra", "Forgerette",
                  "Forgella", "Forgelina", "Taupikeau", "Triopikeau", "Lestombaile",
                  "Dofin", "Superdofin", "Vrombi", "Vrombotor",
                  "Motorizard", "Ferdeter", "Germéclat", "Floréclat", "Toutombe",
                  "Tomberro", "Flamenroule", "Piétacé", "Balbalèze", "Délestin",
                  "Oyacata", "Nigirigon", "Courrousinge",
                  "Terraiste", "Farigiraf", "Deusolourdo", "Scalpereur",
                  "Fort-Ivoire", "Hurle-Queue", "Fongus-Furie", "Flotte-Mèche", "Rampe-Ailes",
                  "Pelage-Sablé", "Roue-de-Fer", "Hotte-de-Fer", "Paume-de-Fer", "Têtes-de-Fer",
                  "Mite-de-Fer", "Épine-de-Fer", "Frigodo", "Cryodo", "Glaivodo",
                  "Mordudor", "Gromago", "Chongjian", "Baojian",
                  "Dinglu", "Yuyu", "Rugit-Lune", "Garde-de-Fer", "Koraidon",
                  "Miraidon", "Serpente-Eau", "Vert-de-Fer",
                  "Pomdramour", "Poltchageist", "Théffroyable",
                  "Félicanis", "Fortusimia", "Favianos", "Ogerpon", "Pondralugon", "Pomdorochi", "Feu-Perçant",
                  "Ire-Foudre", "Roc-de-Fer", "Chef-de-Fer", "Terapagos", "Pêchaminus"

                            ]

for pokemon in pokemons_fr:
    # URL de la page Poképedia du Pokémon
    url_pokemon = "https://www.pokepedia.fr/"+pokemon

    # Récupération du contenu HTML de la page
    response = requests.get(url_pokemon)
    soup = BeautifulSoup(response.content, 'html.parser')

    # Extraction de la description du Pokémon
    description_element = soup.find_all('p')[1]
    description_element2 = soup.find_all('p')[2]
    description = description_element.text.strip()
    description2 = description_element2.text.strip()

    # Création du dictionnaire JSON
    data_pokemon = {
        "nom": pokemon,
        "description": description + description2
    }

    # Conversion du dictionnaire en format JSON
    json_data = json.dumps(data_pokemon, indent=4)

    # Affichage de la description JSON
    print(json_data)