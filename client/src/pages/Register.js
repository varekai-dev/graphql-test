import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import React, { useState, useContext } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useForm } from '../utils/hooks'
import { AuthContext } from '../context/auth'

function Register(props) {
	const context = useContext(AuthContext)
	const [errors, setErrors] = useState({})

	const { onChange, onSubmit, values } = useForm(registerUser, {
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	})

	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update(_, { data: { register: userData } }) {
			context.login(userData)
			props.history.push('/')
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors)
		},
		variables: values
	})

	function registerUser() {
		addUser()
	}

	return (
		<div className="form-container">
			<Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
				<h1>Register</h1>
				<Form.Input label="Username" name="username" type="text" placeholder="Username..." value={values.username} onChange={onChange} error={errors.username ? true : false} />
				<Form.Input label="Email" name="email" type="email" placeholder="Email..." value={values.email} onChange={onChange} error={errors.email ? true : false} />
				<Form.Input label="Password" name="password" type="password" placeholder="Password..." value={values.password} onChange={onChange} error={errors.password ? true : false} />
				<Form.Input label="Confirm Password" name="confirmPassword" type="password" placeholder="Confirm Password..." value={values.confirmPassword} onChange={onChange} error={errors.confirmPassword ? true : false} />
				<Button type="submit" primary>
					Register
				</Button>
			</Form>
			{Object.keys(errors).length > 0 && (
				<div className="ui error message">
					<ul className="list">
						{Object.values(errors).map((value) => (
							<li key={value}>{value}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

const REGISTER_USER = gql`
	mutation register($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
		register(registerInput: { username: $username, email: $email, password: $password, confirmPassword: $confirmPassword }) {
			id
			email
			username
			createdAt
			token
		}
	}
`

export default Register
