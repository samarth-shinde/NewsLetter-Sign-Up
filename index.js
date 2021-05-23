const express = require('express');
const request = require('request');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/',function(req,res) {
    res.sendFile(__dirname+'/signup.html'); 
});

app.post('/',function(req,res){
    var firstName = req.body.fname;
    var lastname = req.body.lname;
    var email = req.body.email;

    var data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastname
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    var options = {
        url : "https://us6.api.mailchimp.com/3.0/lists/fe693d76e2",
        method : "POST",
        headers : {
        "Authorization" : "samarth1 f3bda44c3f89f5ea1c54fd8e3e096a73-us6",
        },  
         body : jsonData 
    }

    request(options,function(error,response,body){
            if(error){
                res.send("there's some issue with this request");
            }else{
                if(response.statusCode ==  200){
                    res.sendFile(__dirname+"/sucess.html");
                }else{
                    res.sendFile(__dirname+"/failure.html");
                }
            }
    });

});


app.post('/failure',function(req,res){
    res.redirect('/');
});

app.listen(process.env.PORT || 8000,function(){
    console.log('your server is ready at 8000');
});

//fe693d76e2
// f3bda44c3f89f5ea1c54fd8e3e096a73-us6