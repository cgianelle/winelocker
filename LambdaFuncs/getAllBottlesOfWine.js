/**
 * Lambda function to retrieve all bottles from the BottleLocker DynamoDB
 * The trigger is the getAllBottlesOfWine AWS API Gateway REST API
 * https://4tethzfmv1.execute-api.us-east-1.amazonaws.com/prod/getAllBottlesOfWine
 */
var doc = require('dynamodb-doc');
var dynamo = new doc.DynamoDB();

function scanDB(params) {
    return new Promise((resolve, reject) => {
        dynamo.scan(params, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

exports.handler = (event, context, callback) => {
    var params = {
       TableName: "BottleLocker"
    };
    
    scanDB(params)
        .then((bottles) => {
            console.log(bottles);
            callback(null, {
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*"
                },
                "body": JSON.stringify(bottles)
            });
        })
        .catch((error) => {
            console.log(error);
            callback(error, null);
        });
}