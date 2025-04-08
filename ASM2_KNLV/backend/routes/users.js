var express = require('express');
var router = express.Router();



const{register,login,getUser,verifyToken,verifyAdmin,addFavorite, getAllUsers}=require('../controllers/userController');


//dăng kí người dùng
router.get('/getalluser', getAllUsers)
router.post('/register',register);
router.post('/login',login);
router.get('/getuser',verifyToken, verifyAdmin, getUser);
router.post('/:email/favorite/:productId', addFavorite);


module.exports = router;
