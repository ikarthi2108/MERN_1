
const nodemailer =require('nodemailer')

var transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'karthiynot2108@gmail.com',
        pass:"ihnsbfwigpcqfcrv"
    }
});

var mailOptions = {
    from:'karthiynot2108@gmail.com',
    to:'karthizx2108@gmail.com',
    subject:"Sending Email using Node.js",
    text:`This is the email sent by karthi`
}

transporter.sendMail(mailOptions,function(error,info){
    if(error){
        console.log(error);
    }else{
        console.log("Email sent: "+info.response);
    } 
})


