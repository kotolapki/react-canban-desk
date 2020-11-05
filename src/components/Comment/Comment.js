import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import styled from 'styled-components';

function Comment(props) {
  const [changeCommentFormVisibility, setChangeCommentFormVisibility] = useState(false);

  function onClickDeleteCommentHandler() {
    props.onClickDeleteComment(props.index);
  }

  function onClickShowChangeCommentForm() {
    setChangeCommentFormVisibility(true);
  }

  function onClickHideChangeCommentForm() {
    setChangeCommentFormVisibility(false);
  }

  function handleKeyDown(e, submit) {
    if (e.keyCode === 13) {
      submit();
      e.target.blur();
    }
  }

  function onSubmitChangeCommentHandler(e) {
    props.onSubmitChangeComment(props.index, e.changeComment);
    setChangeCommentFormVisibility(false);
  }

  return (
    <CommentsItem>
      <CommentAuthor>{props.author}</CommentAuthor>
      {changeCommentFormVisibility ?
        (<Form
          onSubmit={onSubmitChangeCommentHandler}
          initialValues={{changeComment: props.text}}
          render={({ handleSubmit }) => (
            <ChangeCommentForm>
              <ChangeCommentField 
                name='changeComment' 
                component='textarea' 
                placeholder={props.text} 
                autoComplete='off'
                type='text' 
                id='changeComment' 
                onKeyDown={e => handleKeyDown(e, handleSubmit)}
                validate={value => value ? undefined : 'error'}
              />
              <ChangeCommentBtnsWrapper>
                <CommentBtn type='button' onClick={handleSubmit}>Confirm</CommentBtn>
                <CommentBtn type='button' onClick={onClickHideChangeCommentForm}>Cancel</CommentBtn>
              </ChangeCommentBtnsWrapper>
            </ChangeCommentForm>
          )}
        />)
        :
        (<>
          <CommentText>{props.text}</CommentText>
          {props.author === props.userName && 
            <CommentBtnsWrapper>
              <CommentBtn type='button' onClick={onClickShowChangeCommentForm}>change</CommentBtn>
              <CommentBtn type='button' onClick={onClickDeleteCommentHandler}>delete</CommentBtn>
            </CommentBtnsWrapper>
          }
        </>)
      }
    </CommentsItem>
  )
}

export default Comment;

const CommentsItem = styled.li`
  margin-bottom: 10px;
`

const CommentAuthor = styled.p`
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: 800;
`

const CommentText = styled.p`
  margin-bottom: 5px;
  font-size: 16px;
`

const CommentBtnsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`

const CommentBtn = styled.button`
  margin-right: 10px;
  padding: 3px 5px;
  font-size: 14px;
  text-transform: uppercase;
  color: white;
  background-color: black;
  border: none;
  border-radius: 5px;
  outline: none;

  &:hover {
    opacity: 0.6;
  }

  &:active {
    opacity: 0.8;
  }
`

const ChangeCommentForm = styled.form`
  display: flex;
  flex-direction: column;
`

const ChangeCommentField = styled(Field)`
  margin-bottom: 5px;
  padding: 3px;
  width: 100%;
  font-size: 16px;
  border: 1px solid black;
  border-radius: 5px;
  resize: none;
  outline: none;
  box-sizing: border-box;

  &:hover {
    opacity: 0.6;
  }

  &:active {
    opacity: 0.8;
  }
`

const ChangeCommentBtnsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`