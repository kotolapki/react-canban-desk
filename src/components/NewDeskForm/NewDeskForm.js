import React from 'react';
import { Form, Field } from 'react-final-form';
import styled from 'styled-components';

const DeskForm = styled.form`
  margin-right: 15px;
  display: flex;
`
const Label = styled.label`
  margin-right: 15px;
  padding-top: 10px;
  font-size: 20px;
  font-weight: 300;

  &:hover {
    opacity: 0.6;
  }

  &:active {
    opacity: 0.8;
  }
`
const CustomInputField = styled(Field)`
  margin-right: 15px;
  width: 100px;
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
  font-size: 20px;
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

function NewDeskForm(props) {
  function onSubmit(e) {
    props.onSubmit(e.deskname);
    e.deskname = '';
  }

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
          <Label htmlFor='deskname'>Enter new deskname</Label>
          <CustomInputField 
            name='deskname' 
            component='input' 
            placeholder='Deskname' 
            autoComplete='off'
            type='text' 
            id='deskname' 
            onKeyDown={e => handleKeyDown(e, handleSubmit)}
            validate={value => value ? undefined : 'error'}
          />
          <SubmitBtn onClick={handleSubmit}>Confirm</SubmitBtn>
        </DeskForm>
      )}
    />
  );
}

export default NewDeskForm;