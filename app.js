const express = require("express");
const app = express();

const request = require("request");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

//SERVE GET Request
app.get("/", function(req, res) {
	
	res.render("signup.ejs");

});

//SERVE POST Request
app.post("/", function(req, res) {
	
	//FETCH fname, lname, and email from the submitted-form
	const fname = req.body.fname;
	const lname = req.body.lname;
	const email = req.body.email;
	
	//CREATE variable named "data", which is to be sent in the request
	//"data" will be created in JSON format
	const data = {
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_fields: {
					FNAME: fname,
					LNAME: lname
				}
			}
			
		]	
	}
	
	//CONVERTING "data" into string format from JSON format
	const postData = JSON.stringify(data);
	
	//CREATE variable named "options" which is to be passed as a parameter in request()
	const options = {
		url: 'https://usX.api.mailchimp.com/3.0/lists/{list_id}}',
		method: 'POST',
		headers: {
			Authorization: 'auth api-key'
		},
		body: postData		
	}
	
	//SEND POST request to Mailchimp
	request(options, function(error, response, body) {
		if(!error && response.statusCode == 200) {
			res.render("success.ejs");
		} else {
			res.render("failure.ejs");
		}
	});
	
});

app.listen(process.env.PORT || 3000, function() {
	console.log("Server is running on PORT 3000");
});
