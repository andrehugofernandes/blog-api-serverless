"use strict";
const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDb = new AWS.DynamoDb.DocumentClient();

module.exports.get = (even, contex, callback) =>{
  const params = {
    TableName: 'BlogApiTable',
    Key: {
      id: event.pathParameters.id
    }
  };
  dynamoDb.get(params, (error, result) => {

    if (error) {
      console.error(error);
      callback(new Error('Não foi possível achar a psotagem desejada com esse id.'));
      return;

    }
    const response = {
      statusCode: 200,
      body: JSON.stringify(results.Items)
    };
    callback(null, response);

  });
}