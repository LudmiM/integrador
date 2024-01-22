const { leerJSON } = require('./../../data');
const { validationResult } = require("express-validator");

module.exports = (req, res) => {
    const errors = validationResult(req);
    const { email, remember } = req.body;

    if (errors.isEmpty()) { 

        const freelancer = leerJSON('usuarios').freelancers.find(u => u.userEmail.toLowerCase() === email.trim().toLowerCase());
        
        if (!freelancer) {
          const { id, rol, employerImage, companyName, employerPhoneCode,employerPhone,companyDescription }  = leerJSON('usuarios').empresas.find(e => e.userEmail.toLowerCase() === email.trim().toLowerCase());
          req.session.userLogin = { email, id, rol, employerImage, companyName, employerPhoneCode,employerPhone,companyDescription };
        
        } else {
            const { id, rol, freelancerFirstname, freelancerLastname,userEmail, freelancerPhoneCode, freelancerPhone, freelancerImage } = freelancer;
            req.session.userLogin = { email, id, rol, freelancerFirstname, freelancerLastname,userEmail, freelancerPhoneCode, freelancerPhone, freelancerImage };
        }
        
        return res.redirect('/');
    } else {
        // Errores de validación
        return res.render('users/login', {
            errors: errors.mapped()
        });
    }
};
