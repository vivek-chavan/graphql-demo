const AWS = require('aws-sdk');
const client = new AWS.DynamoDB.DocumentClient({region : 'eu-west-1'});
const data = {
  getDate(args) {
    var params = {
		TableName: 'delete_this',
		Key: {
		"id": args.id
		}
	};
	client.get(params, function(err,data){
		if(err){
		console.log('error occured '+err)
		}else{
		console.log(data)
		var a = {id:args.id,'transaction_date':data.Item.transaction_date};
		console.log(a)
		return a;
		}
	});
  },
};
const resolvers = {
  Query: {
    getDate: (root, args) => data.getDate(args),
  },
};

module.exports = resolvers

