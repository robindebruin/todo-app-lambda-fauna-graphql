const initCallback = (callback) => (body) =>
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(body),
  });
export default initCallback;
