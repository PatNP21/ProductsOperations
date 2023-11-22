const Controller = require('./Controller.js') //import klasy Controller z innego pliku
const express = require('express') 

//deklaracja routera do obsługi tras dla metod HTTP
const router = express.Router()

//deklaracja instancji klasy Controller
const controller = new Controller()

router.route("/products")
    .get( //pobieranie danych z bazy 
        controller.getProducts
    )
    .post( //zapis danych do bazy
        controller.addProduct
    )

router.route("/products/:id")
    .get( //pobieranie wybranych danych z bazy
        controller.getProductById
    )
    .put( //edycja wybranych danych będących w bazie
        controller.updateProduct
    )
    .delete( //usunięcie wybranych danych z bazy
        controller.deleteProduct
    )

    router.route("/orders")
    .get( //pobieranie danych z bazy 
        controller.getOrders
    )
    .post( //zapis danych do bazy
        controller.addOrder
    )

router.route("/orders/:id")
    .get( //pobieranie wybranych danych z bazy
        controller.getOrderById
    )
    .put( //edycja wybranych danych będących w bazie
        controller.updateOrder
    )
    .delete( //usunięcie wybranych danych z bazy
        controller.deleteOrder
    )

module.exports = router



