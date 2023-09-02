const app = require('express')
const router = app.Router()

const { SignUp, Login, allUsers, getUserbyEmail,userbyEmail,deleteUser ,updateUser } = require('./controller')



router.post('/signup', SignUp)
router.post('/login', Login)
router.get('/getallusers', allUsers)
router.get('/userbyemail/:email', getUserbyEmail)
// this is done using query params
router.put('/update-user', updateUser)
router.delete('/delete-user',deleteUser)



module.exports = router