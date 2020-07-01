import axios from "axios";
import initCallback from "./utils/initCallback";
require("dotenv").config();

exports.handler = (event, context, callback) => {
  const URL = "https://graphql.fauna.com/graphql";
  const handleCallback = initCallback(callback);

  const query = `query FindAllTodos {
    allTodos {
      data {
        _id
        title
        completed
      }
    }
  }`;

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
      .then((res) => handleCallback(res.data.data))
      .catch((err) => handleCallback(err));
  };

  // Make sure method is GET
  if (event.httpMethod == "GET") {
    getTodos();
  }
};
