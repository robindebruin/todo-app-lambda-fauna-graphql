import axios from "axios";
require("dotenv").config();

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
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body),
    });
  };

  // Perform API call
  const getTodos = () => {
    axios({
      method: "POST",
      url: URL,
      data: JSON.stringify({ query }),
      headers: {
        Authorization: `Bearer ${process.env.FAUNADB_SERVER_SECRET}`,
      },
    })
      .then((res) => send(res.data.data))
      .catch((err) => send(err));
  };

  // Make sure method is GET
  if (event.httpMethod == "GET") {
    getTodos();
  }
};
