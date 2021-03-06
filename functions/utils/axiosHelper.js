import axios from "axios";
require("dotenv").config();

const axiosHelper = (query) => {
  return axios({
    method: "POST",
    url: `${process.env.FAUNADB_GRAPHQL_URL}`,
    data: JSON.stringify(query),
    headers: {
      Authorization: `Bearer ${process.env.FAUNADB_SERVER_SECRET}`,
    },
  });
};

export default axiosHelper;
