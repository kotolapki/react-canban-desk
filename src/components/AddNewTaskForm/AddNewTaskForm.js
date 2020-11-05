import React from 'react';
import { Form, Field } from 'react-final-form';
import styled from 'styled-components';

function AddNewTaskForm({onSubmit}) {
  function handleKeyDown(e, submit) {
    if (e.keyCode === 13) {
      submit();
      e.target.blur();
    }
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <DeskForm>
          <CustomAddNewTaskInputField 
            name='newTask'
            component='input' 
            placeholder='new task' 
            autoComplete='off'
            type='text' 
            id='newTask' 
            onKeyDown={e => handleKeyDown(e, handleSubmit)}
            validate={value => value ? undefined : 'error'}
          />
          <SubmitAddNewTaskBtn onClick={handleSubmit}>
            Confirm
          </SubmitAddNewTaskBtn>
        </DeskForm>
      )}
    />
  )
}

export default AddNewTaskForm;

const DeskForm = styled.form`
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
`

const CustomAddNewTaskInputField = styled(Field)`
  margin-right: 10px;
  font-size: 18px;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  background-color: transparent;

  &:hover {
    opacity: 0.6;
  }

  &:active {
    opacity: 0.8;
  }
`

const SubmitAddNewTaskBtn = styled.button`
  padding: 5px 20px;
  font-size: 18px;
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