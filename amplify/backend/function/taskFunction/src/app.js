/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_DYNAMOECAA7519_ARN
	STORAGE_DYNAMOECAA7519_NAME
	STORAGE_DYNAMOECAA7519_STREAMARN
Amplify Params - DO NOT EDIT */

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

 const AWS = require('aws-sdk')
 const docClient = new AWS.DynamoDB.DocumentClient()
 function id () {
   return Math.random().toString(36).substring(2) + Date.now().toString(36);
 }
 
 /**********************
  * Example get method *
  **********************/
 app.delete("/task/:id", function (request, response) {
   let params = {
     TableName: process.env.STORAGE_DYNAMOECAA7519_NAME,
     Key: {
       id: request.params.id
     }
   }
   docClient.delete(params, (error, result) => {
     if (error) {
       response.json({ statusCode: 500, error: error.message, url: request.url });
     } else {
       response.json({ statusCode: 200, url: request.url, body: JSON.stringify(result) })
     }
   });
 });
 
 app.post('/task/add', function(req, res) {
   // Add your code here
   const {operand1, operand2} = req.body
   let result
   try {
     result = Number(operand1) + Number(operand2)
   } catch (error) {
     console.error(error)
     res.json({error, status:500})
   }
   res.json({success: 'post call succeed!', url: req.url, body: req.body, result})
 });
 
 app.get('/task', function(req, res) {
   var params = {
     TableName: process.env.STORAGE_DYNAMOECAA7519_NAME 
   }
   docClient.scan(params, function(err, data) {
     if (err) res.json({ err })
     else res.json({ data })
   })
 });
 
 app.post('/task', function(req, res) {
   var params = {
     TableName : process.env.STORAGE_DYNAMOECAA7519_NAME,
     Item: {
       id: id(),
       description: req.body.description,
       done: req.body.done,
       responsible: req.body.responsible
     }
   }
   docClient.put(params, function(err, data) {
     if (err) res.json({ err })
     else res.json({ success: 'Contact created successfully!', data:Object.assign({}, req.body, req.params)})
   })
 });
 
 app.put('/task/:id', function(req, res) {
  let params = {
     TableName:process.env.STORAGE_DYNAMOECAA7519_NAME,
     Key:{
         "id": req.params.id
     },
     UpdateExpression: "set responsible= :r, done=:p, description=:a",
     ExpressionAttributeValues:{
         ":r":req.body.responsible,
         ":p":req.body.done,
         ":a":req.body.description
     },
     ReturnValues:"UPDATED_NEW"
 }
   docClient.update(params, function(err, data) {
     if (err) res.json({ err })
     else res.json({ success: 'Contact created successfully!', data:Object.assign({}, req.body, req.params)})
   })
 });
app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
