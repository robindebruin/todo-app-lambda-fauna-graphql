// require("dotenv").config();
// require("encoding");

import axios from "axios";

exports.handler = (event, context, callback) => {
  const URL = "https://graphql.fauna.com/graphql";

  const query = `query FindAllTodos {
    allTodos {
      data {
        _id
        title
        completed
      }
    }
  }`;

  // Send json response to the react client app
  const send = (body) => {
    console.log(`send body`, body);

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body),
    });
  };

  // Perform API call
  const getTodos = () => {
    console.log(`getTodos query`, `${JSON.stringify({ query })}`);

    axios({
      method: "POST",
      url: URL,
      data: JSON.stringify({ query }),
      headers: {
        Authorization: `Bearer ${process.env.FAUNADB_SERVER_SECRET}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Request-With, Content-Type, Accept",
      },
    })
      .then((res) => send(res.data))
      .catch((err) => send(err));
  };

  // Make sure method is GET
  if (event.httpMethod == "GET") {
    getTodos();
  }
};
