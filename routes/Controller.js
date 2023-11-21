const Repository = require('./../databaseIssues/Repository.js')

class Controller {

    constructor() {
        this.repository = new Repository() //wywołanie nowej instancji klasy Repository zawierającej metody do komunikacji z bazą NoSQL
        this.getProducts = this.getProducts.bind(this)
        this.getProductById = this.getProductById.bind(this)
        this.addProduct = this.addProduct.bind(this)
        this.updateProduct = this.updateProduct.bind(this)
        this.deleteProduct = this.deleteProduct.bind(this)
        //pięc powyższych wierszy ... 
    }
    
    //pobieranie wszystkich produktów, czyli zwracanie rezultatów w zależności od powodzenia uzyskania wyników lub ich braku
    getProducts(req, res) {
        //metody komunikacji z baza MongoDB są asymetryczne, dlatego aby zwracać wynik w zależności od ich wykonania, należy użyć metod ".then()" oraz ".catch()", inaczej ta postać metody zapisana jako synchroniczna zwróci wynik np. "Promise{}"
        this.repository.getAllProducts().then(result => { //użycie metody "".then" pozwala wywołać podany kod w przypadku pomyślnego pobrania wyników
            res.status(200).json(result)
        }).catch(err => {
            //obsługa wyjątku (tu błędnego wywołania metody)
            res.status(500).json(err.message)
        })
    }

    //pobieranie pojedynczego elementu
    getProductById(req, res) {
        this.repository.getProductById(req.params.id).then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(500).json(err.message)
        })
    }

    addProduct(req, res) {
        this.repository.createProduct(req.body).then(() => {
            res.status(201).json({"addedRecord": req.body})
        }).catch(err => {
            res.status(500).json(err.message)
        })
    }

    updateProduct(req, res) {
        this.repository.updateProduct(req.params.id, req.body).then(() => {
            res.status(200).json({"updatedRecord": {"_id": req.params.id}})
        }).catch(err => {
            res.status(500).json(err.message)
        })
    }

    deleteProduct(req, res) {
        this.repository.deleteProduct(req.params.id).then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(500).json(err.message)
        })
    }
}

module.exports = Controller