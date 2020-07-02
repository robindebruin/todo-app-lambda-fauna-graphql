import initCallback from "./utils/initCallback";
import axiosHelper from "./utils/axiosHelper";

require("dotenv").config();

exports.handler = (event, context, callback) => {
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

  const getTodos = () => {
    axiosHelper({ query })
      .then((res) => handleCallback(res.data.data))
      .catch((err) => {
        handleCallback(err);
      });
  };

  if (event.httpMethod == "GET") {
    getTodos();
  }
};
