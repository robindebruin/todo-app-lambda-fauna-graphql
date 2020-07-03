import axios from "axios";
require("dotenv").config();
const { default: initCallback } = require("./utils/initCallback");

exports.handler = function (event, context, callback) {
  const handleCallback = initCallback(callback);
  const query = JSON.parse(event.body).query;
  const variables = JSON.parse(event.body).variables;

  axios({
    method: "POST",
    url: `${process.env.FAUNADB_GRAPHQL_URL}`,
    data: { query, variables },
    headers: {
      Authorization: `Bearer ${process.env.FAUNADB_SERVER_SECRET}`,
    },
  })
    .then((res) => {
      handleCallback(res.data);
    })
    .catch((err) => {
      handleCallback(err);
    });
};
