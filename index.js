//inicjalizacja modułu typowo backendowego do wykonywania głównie endpointów
const express = require('express') 

//import biblioteki umożliwiającej przekazywanie danych mimo polityki CORS
const cors = require('cors') 

//import biblioteki pozwalająej przekazywać dane za pomocą endpointów
const bodyParser = require('body-parser') 

//biblioteka umożliwiająca komunikację z bazą danych NoSQL, a dokładnie MongoDB
const mongoose = require('mongoose') 

//env umożliwia pobieranie zmiennych umieszczonych w pliku .env
const env = require('dotenv').config() 

//import biblioteki zezwalającej na operacje na ścieżkach wewnątrz plików projektu
const path = require('path') 

//import tras do wykonywania endpointów za pomocą metod HTTPz pliku Router.js
const ProductRoutes = require('./routes/Router.js')  

//inicjalizacja aplikacji poprzez wywołanie funkcji express dostępnej dzięki bibliotece o tej samej nazwie
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));


//komunikacja z bazą danych
mongoose.connect((process.env.DATABASEURL).toString())
const DbInstance = mongoose.connection

//obsługa przypadku błędu przy połączeniu z bazą danych
DbInstance.on('error', console.error.bind(console, 'connection error: '))

//obsługa wykonania komendy po pomyślnym połączeniu serwera z bazą
DbInstance.once('open', () => {
    console.log("Connected with database.")
})

//postawowa trasa (ang. Route) zwracająca stronę główną w stylu html
app.get("/", (req, res) => {
    res.render(`./index.html`)
})

//zaciąganie tras dla obsługi żądań
app.use("/products", ProductRoutes)

//inicjalizacja portu pod który podpiety zostaje serwer i zwracanie informacji gdy połączenie z serwerem zostanie nawiązane
const Port = process.env.PORT || 2000 
app.listen(Port, () => {
    console.log(`Server ${Port}`)
})