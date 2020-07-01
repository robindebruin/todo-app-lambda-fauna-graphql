import axios from "axios";
import { send } from "./utils/handleCallback";
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
      .then((res) => send(res.data.data, callback))
      .catch((err) => send(err, callback));
  };

  // Make sure method is GET
  if (event.httpMethod == "GET") {
    getTodos();
  }
};
