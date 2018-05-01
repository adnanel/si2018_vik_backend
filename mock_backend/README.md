# Mock Backend
Ovaj projekat predstavlja "mock" backend za lakše testiranje implementacije API klijenta softverskog rješenja 
"Nadzor Vodovodne Mreže".

Radi lakše implementacije realnog API-a, potrebno je samo ispoštovati ispod opisani API.

Opisani API ima REST-like<sup>[1](#footnote1)</sup> dizajn i podržava sljedeće rute:

// todo - Potrebno je još opisati sve objekte (atribute).

### /pipes
Kolekcija cijevi u sistemu. Podrzava <a href='#api-filters'>filter query string</a>.

```
Podržane metode:
- GET (list pipes)
- POST (add pipe)
- DELETE (delete ALL pipes)
- PUT (replace ALL pipes)
```


### /pipes/:id
Podaci o jednom Pipe objektu.

```
Podržane metode:
- GET (get pipe)
- DELETE (delete the target pipe)
- PATCH (update pipe)
```


### /failures
Kolekcija kvarova u sistemu. Podrzava <a href='#api-filters'>filter query string</a>.

```
Podržane metode:
- GET (list failures)
- POST (add failure)
- DELETE (delete ALL failures)
- PUT (replace ALL failures)
```


### /failures/:id
Podaci o jednom Failure objektu.

```
Podržane metode:
- GET (get failure)
- DELETE (delete the target failure)
- PATCH (update failure)
```


```
/constructions
```

```
/measure_stations
```

```
/reports
```

## Api Filters
Api filter object predstavlja "where klauzulu" opisanu kroz JSON. Sastoji se od 2 tipa objekta: "group" i "filter".
Predstavljaju standardizovan način za filtriranje kolekcija kroz API. 

### ApiFilter object
Primjer:
```
{
  "type":"filter",
  "operator":"eq",
  "operandA":"max_pressure",
  "operandB":150
}
```
Prosljeđivanjem navedenog ApiFilter objekta kroz API tražimo sve objekte koji zadovoljavaju relaciju 
`object.max_pressure = 150`.

### ApiFilterGroup object
Ovaj objekt omogućuje grupisanje više `ApiFilter` i `ApiFilterGroup` objekata, gdje "veznik" predstavlja `and` ili `or`
operator. Jednostavni primjer je dat ispod:
```
{
  "type":"group",
  "operator":"and",
  "operands": [
    {1...},
    {2...},
    {3...},
    ...
  ]
}
```
Elementi niza `operands` mogu biti tipa `ApiFilter` i/ili `ApiFilterGroup`. Prosljeđivanjem navedenog ApiFilterGroup 
objekta kroz API tražimo sve objekte koji zadovoljavaju relaciju
`{1...} AND {2...} AND {3...} AND ...`.

 Za složenije primjere pogledati datoteke:
```
/reactjs_site/src/api/ApiFilterGroup.js.
/reactjs_site/src/api/ApiFilterGroup.test.js.
```


### Footnotes

<a name="footnote1">1</a>: Opisani API odstupa od REST specifikacije uglavnom kod query parametara korištenih za 
filtriranje objekata.