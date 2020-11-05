import React from 'react';
import { Form, Field } from 'react-final-form';
import styled from 'styled-components';

function ChangeDeskHeaderForm({onSubmit, placeholder}) {
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
          <CustomChangeHeaderInputField 
            name='newDeskName'
            component='input' 
            placeholder={placeholder} 
            autoComplete='off'
            type='text' 
            id='deskname' 
            onKeyDown={e => handleKeyDown(e, handleSubmit)}
            validate={value => value ? undefined : 'error'}
          />
        </DeskForm>
      )}
    />
  )
}

export default ChangeDeskHeaderForm;

const DeskForm = styled.form`
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
`

const CustomChangeHeaderInputField = styled(Field)`
  margin: 0 auto 10px;
  width: min-content;
  text-align: center;
  font-size: 24px;
  font-weight: 800;
  background-color: transparent;
  border: 1px solid black;
  outline: none;
`