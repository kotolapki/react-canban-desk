import React from 'react';
import { Form, Field } from 'react-final-form';
import styled from 'styled-components';

function TaskPopupCommentForm({onSubmit, onFocus, commentBtnsWrapperVisibility}) {
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
        <TaskPopupForm>
          <TaskCommentTextField 
            name='comment' 
            component='textarea' 
            placeholder='Add new comment' 
            autoComplete='off'
            type='text' 
            id='comment' 
            onKeyDown={e => handleKeyDown(e, handleSubmit)}
            validate={value => value ? undefined : 'error'}
            onFocus={onFocus}
          />
          {commentBtnsWrapperVisibility && 
            <FormBtnsWrapper>
              <FormSubmitBtn onClick={handleSubmit}>
                Confirm
              </FormSubmitBtn>
              <CloseInputFormBtn type='button'/>
            </FormBtnsWrapper>
          }
        </TaskPopupForm>
      )}
    />
  )
}

export default TaskPopupCommentForm;

const TaskPopupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const TaskCommentTextField = styled(Field)`
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  resize: none;
  outline: none;
  box-sizing: border-box;
  background: Silver;

  &:hover {
    opacity: 0.6;
  }

  &:active {
    opacity: 0.8;
  }
`

const FormBtnsWrapper = styled.div`
  margin-bottom: 15px;
  display: flex;
`

const FormSubmitBtn = styled.button`
  margin-right: 10px;
  padding: 5px 10px;
  self-align: flex-end;
  font-size: 16px;
  color: white;
  background-color: black;
  text-transform: uppercase;
  border-radius: 5px;

  &:hover {
    opacity: 0.6;
  }

  &:active {
    opacity: 0.8;
  }
`

const CloseInputFormBtn = styled.button`
  width: 28px;
  height: 28px;
  position: relative;
  background-color: black;
  border: none;
  border-radius: 5px;

  &::before {
    content: '';
    width: 25px;
    height: 2px;
    background-color: white;
    position: absolute;
    bottom: 13px;
    left: 2px;
    transform: rotate(-45deg);
  }

  &::after {
    content: '';
    width: 25px;
    height: 2px;
    background-color: white;
    position: absolute;
    top: 13px;
    left: 2px;
    transform: rotate(45deg);
  }

  &:hover {
    opacity: 0.6;
  }

  &:active {
    opacity: 0.8;
  }
`