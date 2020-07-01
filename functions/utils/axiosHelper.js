import axios from "axios";
require("dotenv").config();

const axiosHelper = (query) => {
  console.log("URL", process.env.FAUNADB_GRAPHQL_URL);
  console.log("SECRET", process.env.FAUNADB_SERVER_SECRET);

  return axios({
    method: "POST",
    url: `${process.env.FAUNADB_GRAPHQL_URL || "https://graphql.fauna.com/graphql"}`,
    data: JSON.stringify({ query }),
    headers: {
      Authorization: `Bearer ${process.env.FAUNADB_SERVER_SECRET}`,
    },
  });
};

export default axiosHelper;
