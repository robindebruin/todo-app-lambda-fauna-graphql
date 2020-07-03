import { gql } from "@apollo/client";

const CREATE_TODO = gql`
  mutation CreateTodo($title: String!, $completed: Boolean!) {
    createTodo(data: { title: $title, completed: $completed }) {
      title
      completed
    }
  }
`;

const ALL_TODOS = gql`
  {
    allTodos {
      data {
        _id
        title
        completed
      }
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      _id
      completed
    }
  }
`;

export { CREATE_TODO, ALL_TODOS, DELETE_TODO };
