const initCallback = (callback) => (body) => {
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify(body),
  });
};
export default initCallback;
