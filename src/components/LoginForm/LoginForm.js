import React from 'react';
import { Form, Field } from 'react-final-form';
import styled from 'styled-components';

function LoginForm({onFormSubmit}) {
  function handleKeyDown(e, submit) {
    if (e.keyCode === 13) {
      submit();
      e.target.blur();
    }
  }

  return (
    <Form
      onSubmit={e => onFormSubmit(e.name)}
      render={({ handleSubmit }) => (
        <UserNameForm>
          <Label htmlFor='name'>Enter your name</Label>
          <CustomInputField 
            name='name' 
            component='input' 
            placeholder='Your name' 
            autoComplete='off'
            type='text' 
            id='name' 
            onKeyDown={e => handleKeyDown(e, handleSubmit)}
            validate={value => value ? undefined : 'error'}
          />
          <SubmitBtn onClick={handleSubmit}>Confirm</SubmitBtn>
        </UserNameForm>
      )}
    />
  );
}

export default LoginForm;

const UserNameForm = styled.form`
  margin: 300px auto 0;
  padding: 20px;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid black;
  border-radius: 10px;
`

const Label = styled.label`
  margin-bottom: 15px;
  font-size: 36px;
  font-weight: 300;

  &:hover {
    opacity: 0.6;
  }

  &:active {
    opacity: 0.8;
  }
`

const CustomInputField = styled(Field)`
  margin-bottom: 15px;
  width: 200px;
  text-align: center;
  font-size: 20px;
  border: none;
  border-bottom: 1px solid black;
  outline: none;

  &:hover {
    opacity: 0.6;
  }

  &:active {
    opacity: 0.8;
  }
`

const SubmitBtn = styled.button`
  padding: 5px 20px;
  font-size: 24px;
  text-transform: uppercase;
  color: white;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  background-color: black;

  &:hover {
    opacity: 0.6;
  }

  &:active {
    opacity: 0.8;
  }
`