const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // Replace with your SMTP host
    port: 587, // Use 465 for SSL or 587 for TLS
    secure: false, // Set to true for SSL, false for TLS
    auth: {
        user: process.env.EMAIL_USER, // Your email or username
        pass: process.env.EMAIL_PASS, // Your password or app-specific password
    },
});

const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'henryadedugba@gmail.com',
    subject: 'Password Reset',
    text: 'Hello, this is a test email!',
    // text: `You requested a password reset. Click the following link to reset your password: http://localhost:4040/users/user/reset_password/${resetToken}`,
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});





















// const nodemailer = require('nodemailer');

// // Create a transporter object using SMTP transport
// // const transporter = nodemailer.createTransport({
// //     service: 'gmail',
// //     auth: {
// //         user: process.env.EMAIL_USER,
// //         pass: process.env.EMAIL_PASS,
// //     },
// // });

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });
//   transporter.verify().then(console.log).catch(console.error);


// const sendPasswordResetEmail = async (recipientEmail, resetToken) => {
//     try {
//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: recipientEmail,
//             subject: 'Password Reset',
//             // text: `You requested a password reset. Click the following link to reset your password: http://localhost:4040/users/user/reset_password/${resetToken}`,
//             text: `You requested a password reset. Click the following link to reset your password: http://localhost:4040/users/user/reset_password/${resetToken}`,
//         };

//         const result = await transporter.sendMail(mailOptions);
//         console.log("result:", result);
//         return result;
//     } catch (error) {
//         throw new Error("Failed to send email");
//     }
// }

// // /auth/change_password

// module.exports = {
//     transporter,
//     sendPasswordResetEmail
// }



// // text: `You requested a password reset. Use the following link to reset your password: http://your-app.com/reset-password?token=${resetToken}`,
// //     html: `
// //         <p>You requested a password reset. Click the link below to reset your password:</p>
// //         <a href="http://your-app.com/reset-password?token=${resetToken}">Reset Password</a>
// //       `,