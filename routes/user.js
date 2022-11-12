const express = require("express");
const router = express.Router();
const userController = require('../controllers/UserController')
const auth = require('../middleware/auth')

router.post('/signup', userController.signup)
router.post('/signupVerify', userController.signupVerify)
router.post('/signin', userController.signin)
router.post('/signinVerify', userController.signinVerify)
router.post('/registerUser', userController.registerUser)
router.post('/resendOtp', userController.signup)





// ****************Home Page Api start*******************
router.post('/categoryBanner',  userController.categoryBanner)
router.get('/allTestimonials',  userController.allTestimonials)
router.post('/categoryTestimonials',  userController.categoryTestimonials)
router.get('/allBanners',  userController.allBanners)
router.get('/allServices',  userController.allServices)
router.post('/categoryServices',  userController.categoryServices)
router.post('/addTrackTrace',  userController.addTrackTrace)
router.post('/userTrackTraceList',  userController.userTrackTraceList)
router.post('/userTrackTraceListGraph',  userController.userTrackTraceListGraph)
router.post('/updatePushNotification',  userController.updatePushNotification)




// ****************Home Page Api end*********************

// ****************Account Page Api start*****************
router.post('/getUserProfile',  userController.getUserProfile)
router.post('/updateUserProfile',  userController.updateUserProfile)

// ****************Account Page Api end*******************

// ****************Fitness Page Api start*****************
router.post('/branchDetailsBySerivceName',  userController.branchDetailsBySerivceName)
router.get('/allGymBranches',  userController.allGymBranches)
router.post('/addPersonalInfo',  userController.addPersonalInfo)
router.post('/bookingDemoByUser',  userController.bookingDemoByUser)
router.post('/bookingPackageByUser',  userController.bookingPackageByUser)
router.post('/paymentBuyUser',  userController.paymentBuyUser)
router.post('/GymBranchesByServiceName',  userController.GymBranchesByServiceName)
router.post('/userOrderAndSubscription',  userController.userOrderAndSubscription)






// ****************Fitness Page Api end*******************

// ****************Support Page Api start*****************
router.get('/allFaqs',  userController.allFaqs)
router.post('/createFaq', userController.createFaq)
router.get('/termCondtionAndPrivacyPolicy',  userController.termCondtionAndPrivacyPolicy)
router.post('/createTermCondtionAndPrivacyPolicy', userController.createTermCondtionAndPrivacyPolicy)
router.post('/allUserQueries',  userController.allUserQueries)
router.post('/createUserQuery',  userController.createUserQuery)
router.post('/UserActivityAndRecords',  userController.UserActivityAndRecords)



// ****************Support Page Api end*****************

router.post('/serviceSlottimeById', userController.serviceSlottimeById)

router.post('/updateGymBranches', userController.updateGymBranches)


router.post('/bookingConsultantByUser',  userController.bookingConsultantByUser)


router.post('/addCoachTest', userController.addCoach)

router.post('/bookingCoach', userController.bookingCoach)









module.exports = router;