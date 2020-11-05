import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import getRandomId from '../../utils/getRandomId';
import Comment from '../Comment';
import TaskPopupDescriptionForm from '../TaskPopupDescriptionForm';
import TaskPopupCommentForm from '../TaskPopupCommentForm';

function TaskPopup(props) {
  const [taskDescription, setTaskDescription] = useState('Add task description');
  const [comments, setComment] = useState([]);
  const [taskDescriptionFormVisibility, setTaskDescriptionFormVisibility] = useState(false);
  const [commentBtnsWrapperVisibility, setCommentBtnsWrapperVisibility] = useState(false);

  useEffect(() => {
    const deskIndex = props.index;
    const taskIndex = props.taskData.index;
    const localTasks = localStorage.getItem('tasks');

    if (localTasks) {
      const parsedTasks = JSON.parse(localTasks);

      if (parsedTasks[deskIndex][taskIndex].description) {
        setTaskDescription(parsedTasks[props.index][props.taskData.index].description)
      }

      if (parsedTasks[deskIndex][taskIndex].comments) {
        setComment(parsedTasks[props.index][props.taskData.index].comments);
      }
    }
  }, [props.index, props.taskData.index]);

  function onClickShowTaskDescriptionForm() {
    setTaskDescriptionFormVisibility(true);
  }

  function onClickHideTaskDescriptionForm() {
    setTaskDescriptionFormVisibility(false);
  }

  function onSubmitAddTaskDescription({taskDescription}) {
    const deskIndex = props.index;
    const taskIndex = props.taskData.index;
    const tasksResponse = localStorage.getItem('tasks');

    if (tasksResponse) {
      const parsedTasks = JSON.parse(tasksResponse);

      parsedTasks[deskIndex][taskIndex].description = taskDescription;
      setTaskDescription(taskDescription);

      localStorage.setItem('tasks', JSON.stringify(parsedTasks));
    }

    setTaskDescriptionFormVisibility(false);
  }

  function onSubmitAddComment(e) {
    const deskIndex = props.index;
    const taskIndex = props.taskData.index;
    const tasksResponse = localStorage.getItem('tasks');

    function createNewComment() {
      const newComment = {text: e.comment, author: props.userName, id: getRandomId()};

      return newComment;
    }

    if (tasksResponse) {
      const parsedTasks = JSON.parse(tasksResponse);

      if (parsedTasks[deskIndex][taskIndex].comments) {
        parsedTasks[deskIndex][taskIndex].comments.push(createNewComment());
      } else {
        parsedTasks[deskIndex][taskIndex].comments = [createNewComment()];
      }

      setComment(parsedTasks[deskIndex][taskIndex].comments);
      localStorage.setItem('tasks', JSON.stringify(parsedTasks));
    }

    e.comment = '';
    setCommentBtnsWrapperVisibility(false);
  }

  function onClickDeleteComment(commentIndex) {
    const deskIndex = props.index;
    const taskIndex = props.taskData.index;
    const tasksResponse = localStorage.getItem('tasks');
    const parsedTasks = JSON.parse(tasksResponse);

    parsedTasks[deskIndex][taskIndex].comments.splice(commentIndex, 1);
    setComment(parsedTasks[deskIndex][taskIndex].comments);
    localStorage.setItem('tasks', JSON.stringify(parsedTasks));
  }

  function onSubmitChangeComment(commentIndex, newCommentValue) {
    const deskIndex = props.index;
    const taskIndex = props.taskData.index;
    const tasksResponse = localStorage.getItem('tasks');
    const parsedTasks = JSON.parse(tasksResponse);

    parsedTasks[deskIndex][taskIndex].comments[commentIndex].text = newCommentValue;
    setComment(parsedTasks[deskIndex][taskIndex].comments);
    localStorage.setItem('tasks', JSON.stringify(parsedTasks));
  }

  function onFocusShowCommentBtnsWrapper() {
    setCommentBtnsWrapperVisibility(true);
  }

  function onClickHideFormsHandler(e) {
    if (taskDescriptionFormVisibility && e.target.parentElement.tagName !== 'FORM') {
      setTaskDescriptionFormVisibility(false);
    }
    
    if (commentBtnsWrapperVisibility && e.target.parentElement.tagName !== 'FORM') {
      setCommentBtnsWrapperVisibility(false);
    }
  }

  return(
    <TaskPopupOverlay onClick={props.onClickHideTaskPopup} id='overlay'>
      <TaskPopupContainer onClick={onClickHideFormsHandler}>
        <TaskPopupHeader>
          <TaskName>{props.taskData.text}</TaskName>
          <CloseTaskPopupBtn type='button' id='hidePopupBtn' onClick={props.onClickHideTaskPopup}/>
        </TaskPopupHeader>
        <DeskName>В доске: {props.deskName}</DeskName>
        <TaskAuthor>Автор: {props.taskData.author}</TaskAuthor>
        <TaskDescriptionHeader>Task description</TaskDescriptionHeader>
        {taskDescriptionFormVisibility ?
          (<TaskPopupDescriptionForm
            onSubmit={onSubmitAddTaskDescription}
            onClick={onClickHideTaskDescriptionForm}
            initialValues={{taskDescription: taskDescription}}
          />)
          :
          (<TaskDescription onClick={onClickShowTaskDescriptionForm}>{taskDescription}</TaskDescription>)
        }
        <TaskPopupCommentForm
          onSubmit={onSubmitAddComment}
          onFocus={onFocusShowCommentBtnsWrapper}
          commentBtnsWrapperVisibility={commentBtnsWrapperVisibility}
        />
        <ul>
          {comments.map((comment, index) => 
            <Comment 
              userName={props.userName}
              author={comment.author} 
              text={comment.text} 
              id={comment.id} 
              key={index} 
              index={index}
              onClickDeleteComment={onClickDeleteComment}
              onSubmitChangeComment={onSubmitChangeComment}
            />)
          }
        </ul>
      </TaskPopupContainer>
    </TaskPopupOverlay>
  )
}

export default TaskPopup;

const TaskPopupOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.8);
`

const TaskPopupContainer = styled.div`
  padding: 20px;
  width: 500px;
  position: absolute;
  z-index: 2;
  top: 150px;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid black;
  border-radius: 10px;
  background-color: white;
`

const TaskPopupHeader = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`

const TaskName = styled.h3`
  font-size: 26px;
  font-weight: 800;
`

const CloseTaskPopupBtn = styled.button`
  margin-top: 5px;
  width: 20px;
  height: 20px;
  position: relative;
  background-color: black;
  border: none;
  border-radius: 3px;

  &::before {
    content: '';
    width: 15px;
    height: 2px;
    background-color: white;
    position: absolute;
    bottom: 9px;
    left: 3px;
    transform: rotate(-45deg);
  }

  &::after {
    content: '';
    width: 15px;
    height: 2px;
    background-color: white;
    position: absolute;
    top: 9px;
    left: 3px;
    transform: rotate(45deg);
  }
`

const DeskName = styled.p`
  margin-bottom: 10px;
  font-size: 20px;
`

const TaskAuthor = styled.p`
  margin-bottom: 10px;
  font-size: 18px;
`

const TaskDescriptionHeader = styled.label`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 600;
`

const TaskDescription = styled.p`
  margin-bottom: 10px;
  padding: 5px;
  font-size: 18px;

  &:hover {
    opacity: 0.6;
  }

  &:active {
    opacity: 0.8;
  }
`