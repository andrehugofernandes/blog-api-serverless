"use strict";
const AWS = require('aws-sdk');
const uuid = require('uuis');

const dynamoDb = new AWS.SynamoDb.DocumentClient();
const params = {
  TableName: 'BlogApiTable'
}

module.exports.listPostsBlog = (event, context, callback) => {
  dynamoDb.scan(params, (error, result) => {
    if (error){
      console.error(error);
      callback(new Error('Não foi possível listar as postagens.'));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    };

    callback(null, response);

  });
}
