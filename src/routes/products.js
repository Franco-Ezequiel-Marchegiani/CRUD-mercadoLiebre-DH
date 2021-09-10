// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const storage = multer.diskStorage({
    destination: path.join(__dirname, "../../public/images/products"),
    filename: (req, file, callback) =>{
        callback(null, Date.now() + path.extname(file.originalname));
    }
})
const upLoader = multer({storage})
// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/', upLoader.single("image"),productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', productsController.edit); 
router.put('/:id', productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;
