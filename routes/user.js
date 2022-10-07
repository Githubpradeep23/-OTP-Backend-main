const express=require("express");
const router=express.Router();
const userController=require('../controllers/UserController')


router.post('/signup',userController.signup)
router.post('/signupVerify',userController.signupVerify)
router.post('/signin',userController.signin)
router.post('/signinVerify',userController.signinVerify)

router.post('/categoryBanner',userController.verifytoken,userController.categoryBanner)

router.get('/verifytoken',userController.verifytoken)


module.exports=router;