import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";

function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result);
    },
    variables: values,
  });
  const onSubmit = (e) => {
    e.preventDefault();
    addUser();
  };

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          name="username"
          type="text"
          placeholder="Username..."
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          name="email"
          type="email"
          placeholder="Email..."
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          name="password"
          type="password"
          placeholder="Password..."
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password..."
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
