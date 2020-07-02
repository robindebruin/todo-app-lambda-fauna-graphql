import initCallback from "./utils/initCallback";
import axiosHelper from "./utils/axiosHelper";

exports.handler = (event, context, callback) => {
  const handleCallback = initCallback(callback);

  const data = JSON.parse(event.body);

  const query = `mutation CreateTodo {
    createTodo(data: {
    title: "${data.title}"
    completed: false
    }) {
        title
        completed
    }
 }`;

  const foo = () => {
    axiosHelper({ query })
      .then((res) => handleCallback(res.data.data))
      .catch((err) => {
        handleCallback(err);
      });
  };

  if (event.httpMethod == "POST") {
    foo();
  }
};
