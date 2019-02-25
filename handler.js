const { graphql } = require('graphql');
var schema = require('./schema.js');
var resolvers = require('./resolver.js')
var makeExecutableSchema = require('graphql-tools').makeExecutableSchema
const AWS = require('aws-sdk');
const client = new AWS.DynamoDB.DocumentClient({region : 'eu-west-1'});

exports.handler = (event, context, callback) => {
  
  const myGraphQLSchema = makeExecutableSchema({
    typeDefs:schema,
    resolvers,
  });

  let query = event.query;
  if (event.query && event.query.hasOwnProperty('query')) {
    query = event.query.query.replace("\n", ' ', "g");
  }
  console.log(query)
  console.log('before calling ')
  graphql(myGraphQLSchema, query).then(function(err, result) {
    if (err){
      console.log(err)
      callback(null,err)
    }
    return callback(null, result);

  }).catch((error) => {
    console.log(error)
    callback(null,error)
  });
};
