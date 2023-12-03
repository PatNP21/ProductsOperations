const {check} = require('express-validator')
const Repository = require('../databaseIssues/Repository')

const checkIfProductExists = async (value, { req }) => {
    let repository = new Repository()

    try {
        repository.getProductByName(req).then((res) => {
            if(res.exists(req.name)) {
                Promise.resolve()
            }else {
                Promise.reject(new Error("The product does not exist."))
            }
        })
    } catch(err) {
        Promise.reject(new Error(err))
    }
    
}

const create = [
    check('name').exists().isString().isLength({min: 1}).trim(),
    check('name').not().exists(),
    check('revision').exists().isString().isLength({min: 1}).trim(),
    check('availableAmount').exists().isNumeric({min: 0}),
    check('price').exists().isNumeric({min: 0}),
    check('isAvailable').exists().isBoolean()
]

const update = [
    check('name').exists().isString().isLength({min: 1}).trim(),
    check('revision').exists().isString().isLength({min: 1}).trim(),
    check('availableAmount').exists().isNumeric({min: 0}),
    check('price').exists().isNumeric({min: 0}),
    check('isAvailable').exists().isBoolean()
]

const remove = [
    check('name').exists().isString().isLength({min: 1}).trim()
]

module.exports = {create, update, remove}
