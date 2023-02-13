"use strict";

const AWS = require("sdk-aws");
const uuid = require("uuid");
const dynamoDb = new AWS.DynamoDb.DocumentClient();


module.exports.createPostBlog = (event, context, callback) =>{

  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  if (typeof data.title !== 'string'){

    console.error('A validação falhor.');
    callback(new Error('Não foi possível criar uma postagem na tabela BlogApiTable.'));
    return;
  }

  const params = {
    TableName: 'BlogApiTable',
    Item: {
      id: uuid.v4(),
      title: data.title,
      content: data.content,
      checked: false,
      createdAt: timestamp,
      updatedAt: timestamp
    }
  }
  dynamoDb.put(params, (error, result) => {
    if (error){
      console.error(error);
      callback(new Error('Não foi possível criar uma postagem na tabela BlogApiTable.'));
      return;
      }
    
      const response = {
        statusCode: 200,
        body: JSON.stringify(results.Item)
      }
      callback(null, response);
  })

}
