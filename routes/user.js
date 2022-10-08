const express=require("express");
const router=express.Router();
const userController=require('../controllers/UserController')
const auth=require('../middleware/auth')

router.post('/signup',userController.signup)
router.post('/signupVerify',userController.signupVerify)
router.post('/signin',userController.signin)
router.post('/signinVerify',userController.signinVerify)

// ****************Home Page Api start*******************
router.post('/categoryBanner',auth.verifytoken,userController.categoryBanner)
router.get('/allTestimonials',auth.verifytoken,userController.allTestimonials)
router.get('/allBanners',auth.verifytoken,userController.allBanners)
router.get('/allServices',auth.verifytoken,userController.allServices)
router.post('/addTrackTrace',auth.verifytoken,userController.addTrackTrace)
router.post('/userTrackTraceList',auth.verifytoken,userController.userTrackTraceList)



// ****************Home Page Api end*******************

module.exports=router;