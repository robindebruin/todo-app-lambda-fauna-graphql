// Send json response to the react client app
export const send = (body, callback) => {
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify(body),
  });
};
