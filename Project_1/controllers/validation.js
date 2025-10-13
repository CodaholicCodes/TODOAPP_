const { check }  =require('express-validator');

exports.firstNameValidation=check('FirstName')
.notEmpty()
.withMessage('First Name is required')
.trim()
.isLength({min:2})
.withMessage('First Name must be at least 2 characters long')
.matches(/^[A-Za-z]+$/)
.withMessage('First Name must contain only alphabetic characters');

exports.lastNameValidation=check('LastName')
.trim()
.matches(/^[A-Za-z]*$/)
.withMessage('Last Name must contain only alphabetic characters');

exports.emailValidation=check('email')
.isEmail()
.withMessage('Please enter a valid email address')
.normalizeEmail();

exports.passwordValidation=check('password')
.isLength({min : 6})
.matches(/[A-Z]/)
.withMessage('Password must contain at least one uppercase letter')
.matches(/[a-z]/)
.withMessage('Password must contain at least one lowercase letter')
.matches(/[!@#$%^&*(),.?":{}|<>]/)
.withMessage('Password must contain at least one special character')
.trim();

exports.confirmPasswordValidation=check('confirmPassword')
.trim()
.custom((value , {req})=>{
if(value !== req.body.password){
    throw new Error('Passwords do not match');
}
return true;
}
);

exports.roleValidation=check('role')
.notEmpty()
.withMessage('Role is required')
.isIn(['customer','host'])
.withMessage('Role must be either customer or host');

exports.termsValidation=check('acceptTerms')
.notEmpty()
.withMessage('You must accept the terms and conditions');