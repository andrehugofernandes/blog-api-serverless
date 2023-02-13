"use strict";
const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDb = new AWS.DynamoDb.DocumentClient();

module.exports.update = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  if(typeof data.title !== 'string' || data.checked !== 'boolean' || data.content !== 'string'){
    console.error('validation Error.');
    callback(new Error('Não foi possível atualizar a postagem'));
    return;

  }
  const params = {
    TableName: 'BlogApiTable',
    Item: {
      id: event.pathParameteres.id,
      title: data.title,
      content: data.content,
      checked: data.checked,
      updatedAt: timestamp

    }

  }
  dynamoDb.put(params, (error, result) => {
    if (error){
      console.error(error);
      callback(new Error('Não foi possível atualizar a postagem.'));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    }

    callback(null, response);


  });
}