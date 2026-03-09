# Porin lukudiplomi

Porin lukudiplomi koostuu aihelistoista. Kukin aihelista sisältää aiheeseen liittyviä 
kirjoja sekä aihekohtaisia tehtäviä. Listan sisällä kirjat on jaettu
lukutason mukaan kolmeen tasoon. Oppilas voi valita itselleen sopivan tason,
taso ei ole kytketty oppilaan luokka-asteeseen tai ikään.

Porin lukudiplomia voi katsoa Satakirjastojen Finna-näkymästä.

# Lukudiplomi Finnassa

Lukudiplomin kirjat tallennetaan aiheittain Finna-suosikkilistoihin. Aiheen tehtävät voi kirjoittaa 
listan kuvaukseen. Jokaiseen listan kirjaan lisätään muistiinpano, joka sisältää kirjan lukutason. 
Muistiinpanoon voidaan halutessaan kirjoittaa vielä lisätietoja, esim. kuuluuko kirja tiettyyn sarjaan.
On myös mahdollista lisätä HTML-formatointia, esimerkiksi hakulauseke koko sarjaan, josta vain yksi
nostetaan suosikkilistalle.

Listat lisätään Finnaan content-sivulle seuraavasti:

`<?= $this->userlistEmbed(['id' => 395962, 'view' => 'grid-extended', 'date' => false, 'title' => false])?>`

missä `'id'` on listan numero, joka löytyy listan URL-kentästä.

Erotuksena tavalliseen grid-listaan tässä muokatussa listassa näytetään
tietueen muistiinpano suoraan, ei avattavana tekstikenttänä, ja myös
saatavuustiedot löytyvät varausnappeineen.

HUOM: Listan pitää tallentaa tuotantoympäristössä, mutta tuolloin listaa ei voida lukea pre-puolella. Tämän
takia listat alkavat näkyä vasta julkaisemisen jälkeen. Jos haluaa testata, voi luoda myös pre-puolelle
suosikkilistoja ja käyttää niitä pre-puolen testauksessa.

Suosikki-listojen pitää olla julksia, jotta ne näkyvät kaikille.

# Miten se toimii?

## Muutettu Finna-lista

Tiedosto `custom/templates/RecordDriver/DefaultRecord/result-grid-extended.phtml`
luo lukudiplomille sopivat grid-listat Finnassa. Se on muokattu versio
finna2-kansion alla olevasta `result-grid.phtml` -tiedostosta. Muokattu grid-lista saadaan
käyttöön tallentamalla tiedosto `list-grid-extended.phtml` tästä GIT-varannosta  `custom/templates/search` -kansioon.

## Lukudiplomi-tiedosto, lukutason suodatus ja tyylimuokkauksia

`Porin_lukudiplomi_fi.phtml` sisältää Porin version lukudiplomista, joka
on sisällytetty Bootstrap-akkordioniin. Näin nähdään heti aiheiden otsikot
yhdellä silmäyksellä, ja voidaan avata vain tarvittava aihelista
näkyviin. Kun toinen lista avataan, aiemmin avoinna ollut lista suljetaan
automaattisesti.

Kirjalistat ovat hyvin pitkiä, ja kun niitä suljetaan, koko HTML-sivun pituus
on yhtäkkiä paljon lyhyempi kuin oli aikaisemmin. Tämän takia tarvitaan vielä
erikseen JS-koodia, joka hoitaa sen, että listan otsikot jäävät näkyviin, kun
lista suljetaan. Tarvittava koodi löytyy `custom.js` -tiedostosta. Se koostuu
funktion määrittelystä ja funktion kutsusta, joka suoritetaan finnaCustomInit()-Funktion
sisällä.

Lukija voi rajata kirjojen näkyvyyttä niin, että hän näkee vain
oman lukutason kirjoja. Sitä varten löytyy suodatin pudotusvalikkona,
jonka toiminnallisuus löytyy myös JS-koodina `custom.js` -tiedostosta.

Tähän lukudiplomiin on lisätty vielä tyylit, joita käytetään lukudiplomin
ulkoasun muokkaamiseen Satakirjastojen teeman mukaisesti. Tyylit perustuvat
siihen, että käytetään Bootstrap-akkordionia listojen näyttämiseen.
