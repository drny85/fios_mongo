const send_email = require('@sendgrid/mail');
send_email.setApiKey(process.env.SENDGRID_API_KEY);



exports = send_email;

