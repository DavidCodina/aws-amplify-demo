/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

exports.handler = async (event) => {
  // Our path was will be something like  /customers/1 such that the '1'
  // will be mapped to the event.pathParameters.customerId property.
  const customerId = event.pathParameters.customerId
  console.log(event) // The log statement will go into cloud watch where you can view it.

  // Normally, we would call a backend to use the customerId to get the associated data.
  // However, to start out we'll just return a hardcoded response.
  const customer = {
    customerId: customerId,
    customerName: `Customer ${customerId}`
  }

  const response = {
    statusCode: 200,

    // Uncomment this to enable CORS requests
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    },
    body: JSON.stringify(customer)
  }

  return response
}
