var express = require('express');
var router = express.Router();



const{register,login,getUser,verifyToken,verifyAdmin,addFavorite, getAllUsers, checkFavorite}=require('../controllers/userController');


//dăng kí người dùng
router.get('/getalluser', getAllUsers)
router.post('/register',register);
router.post('/login',login);
router.get('/getuser',verifyToken, verifyAdmin, getUser);
router.post('/:email/favorite/:productId', addFavorite);
// thêm route kiểm tra yêu thích
router.get('/:email/favorite/:productId', checkFavorite);


module.exports = router;
