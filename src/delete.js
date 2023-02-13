"use strict";
const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDb = new AWS.DynamoDb.DocumentClient();

module.exports.update = (event, context, callback) => {
  
  const params = {
    TableName: 'BlogApiTable',
    Key: {
      id: event.pathParameters.id
    }
  };
  dynamoDb.delete(params, (error) =>{

    if(error){
      console.error(error);
      callback(new Error('Não foi possível apagar a postagem.'));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify({})
    }
    callback(null, response);

  });
}