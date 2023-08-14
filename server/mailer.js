const nodeMailer = require('nodemailer');


/* mailTransporter object is used to send emails to users */
const mailTransporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: "ratemyclasses060@gmail.com",
        pass: "jdvlszkkfmqjlecg"
    }
})


/* functions below are used to send different types of emails to the user */
/* NOTE: will have to adjust redirect links when deploying */

function sendSignUpConfirmationEmail(email, temp_userid) {
    let details = {
        from: "ratemyclasses060@gmail.com",
        to: email,
        subject: "RateMyClasses | Confirm Account",
        html: `
        <h1>
        Your account is in the process of being confirmed!
        </h1>
        <h4>
        Confirm your account with the following id: ${temp_userid}
        </h4>
        <p>Note: id only valid for 10 minutes. Link for account confirmation: http://localhost:3001/signup/confirmation</p>
        `
    }

    mailTransporter.sendMail(details, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("signup confirmation sent!");
        }
    })
}



function sendNewAccountPasswordEmail(email, password) {
    let details = {
        from: "ratemyclasses060@gmail.com",
        to: email,
        subject: "RateMyClasses | New Account Confirmed",
        html: `
        <h1>
        Your acount has been confirmed!
        </h1>
        <p>
        Sign in using the following password: ${password}
        </p>
        `
    }

    mailTransporter.sendMail(details, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("new account password email sent!");
        }
    })
}



function sendChangePasswordConfirmationEmail(email, temp_userid) {
    let details = {
        from: "ratemyclasses060@gmail.com",
        to: email,
        subject: "RateMyClasses | Confirm Password Change",
        html: `
        <h1>
        Your password is in the process of being changed!
        </h1>
        <h4>
        Confirm your password change with the following id: ${temp_userid}
        </h4>
        <p>Note: id only valid for 10 minutes. Link for password confirmation: http://localhost:3001/change-password/confirmation</p>
        `
    }

    mailTransporter.sendMail(details, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("password change confirmation email sent!");
        }
    })
}



function sendPasswordChangedEmail(email, password) {
    let details = {
        from: "ratemyclasses060@gmail.com",
        to: email,
        subject: "RateMyClasses | Password Change Confirmed",
        html: `
        <h1>
        Your password has been changed!
        </h1>
        <p>
        New password: ${password}
        </p>
        `
    }

    mailTransporter.sendMail(details, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("new password email sent!");
        }
    })
}

module.exports = { sendSignUpConfirmationEmail, sendNewAccountPasswordEmail,
    sendChangePasswordConfirmationEmail, sendPasswordChangedEmail };