module.exports = (app) => {
    const  validate = require('../Middleware/validation');
    const User = require('../controller/userController');

    //register a new user
    app.post('/register',validate.signupValidation,User.signup);

    //login an existing user
    app.post('/login',validate.loginValidation,User.login);

    //update an existing user
    app.put('/update',User.updateUser);

    //find a donor
    app.post('/findaDonor',User.getDonor)

}