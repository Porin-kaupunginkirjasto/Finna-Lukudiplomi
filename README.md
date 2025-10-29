# Porin lukudiplomi

Porin lukudiplomi koostuu aihelistoista. Kukin aihelista sisältää aiheeseen liittyviä kirjoja sekä aihekohtaisia tehtäviä. Listan sisällä kirjat on jaettu
lukutason mukaan kolmeen tasoon. Oppilas voi valita itselleen sopivan tason,
taso ei ole kytketty oppilaan luokka-asteeseen tai ikään.

# Lukudiplomi Finnassa

Lukudiplomin kirjat tallennetaan aiheittain Finna-listoihin. Aiheen tehtävät voi kirjoittaa listan kuvaukseen. Jokaiseen listan kirjaan lisätään muistiinpano, joka sisältää kirjan lukutason. Muistiinpanoon voidaan halutessaan kirjoittaa vielä lisätietoja, esim. kuuluuko kirja tiettyyn sarjaan.

Listat lisätään Finnaan content-sivulle seuraavasti:

`<?= $this->userlistEmbed(['id' => 395962, 'view' => 'grid-extended', 'date' => false, 'title' => false])?>`

missä `'id'` on listan numero, joka löytyy listan URL-kentästä.

Erotuksena tavalliseen grid-listaan tässä muokatussa listassa näytetään
tietueen muistiinpano suoraan, ei avattavana tekstikenttänä, ja myös
saatavuustiedot löytyvät varausnappeineen.

# Miten se toimii?

## Muutettu Finna-lista

Tiedosto `custom/templates/RecordDriver/DefaultRecord/result-grid-extended.phtml`
luo lukudiplomille sopivat grid-listat Finnassa. Se on muokattu versio
finna2-kansion alla olevasta `result-grid.phtml` -tiedostosta. Se saadaan
käyttöön tallentamalla `custom/templates/search` -kansioon tiedosto `list-grid-extended.phtlm` tästä GIT-varannosta.

## Lukudiplomi-tiedosto, lukutason suodatus ja tyylimuokkauksia

`Porin_lukudiplomi_fi.phtml` sisältää Porin version lukudiplomista, joka
on sisällytetty Bootstrap-akkordioniin. Näin nähdään heti aiheiden otsikot
yhdellä silmäyksellä, ja voidaan avata vain tarvittava aihelista
näkyviin. Kun toinen lista avataan, aiemmin avoinne ollut suljetaan
automaattisesti.

Koska listat ovat pitkiä, ja kun niitä suljetaan, koko HTML-sivun pituus
on yhtäkkiä paljon lyhyempi kuin oli aikaisemmin, tarvitaan vielä
erikseen JS-koodia, joka hoitaa sen, että listan otsikot jäävät aina
näkyviin. Tarvittava koodi löytyy `custom.js` -tiedostosta.

Lisäksi lukija voi rajat kirjojen näkyvyyttä niin, että hän näkee vain
oman lukutason kirjoja. Sitä varten löytyy suodatin pudotusvalikkona,
jonka toiminnallisuus löytyy myös JS-koodina `custom.js` -tiedostosta.

Tähän lukudiplomiin on lisätty vielä tyylit, joita käytetään lukudiplomin
ulkoasun muokkaamiseen Satakirjastojen teeman mukaisesti. Tyylit perustuvat
siihen, että käytetään Bootstrap-akkordionia listojen näyttämiseen.
