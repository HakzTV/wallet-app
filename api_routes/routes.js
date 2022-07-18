"use strict"

// Passing in controllers
const controller = require('../controllers/controller.js');
const routes = (app) =>{
    app.route('/signup').post(controller.register);
    app.route('/login').post(controller.login);
    app.route('/logout').post(controller.logout);
    app.route('/verifyemail').post(controller.verifyEmail);
    app.route('/resendemailverification').post(controller.resendEmailVerification);
    app.route('/dashboard/getwalletinfo').get(controller.getWalletInfo);
    app.route('/tx/:walletcredit').get(controller.walletCredit);
    app.route('/tx/:walletwithdraw').post(controller.walletWithdraw);
    app.route('/tx/:wallettransfer').post(controller.walletTransfer);
    app.route('/cs/:walletrequesttreversal').post(controller.walletRequestTreversal)
}

module.exports = routes;