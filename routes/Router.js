const Controller = require('./Controller.js') //import klasy Controller z innego pliku
const express = require('express') 

//deklaracja routera do obsługi tras dla metod HTTP
const router = express.Router()

//deklaracja instancji klasy Controller
const controller = new Controller()

router.route("/")
    .get( //pobieranie danych z bazy 
        controller.getProducts
    )
    .post( //zapis danych do bazy
        controller.addProduct
    )

router.route("/:id")
    .get( //pobieranie wybranych danych z bazy
        controller.getProductById
    )
    .put( //edycja wybranych danych będących w bazie
        controller.updateProduct
    )
    .delete( //usunięcie wybranych danych z bazy
        controller.deleteProduct
    )

module.exports = router



