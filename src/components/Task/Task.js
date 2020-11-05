import React from 'react';
import styled from 'styled-components';

function Task(props) {
  function onClickDeleteTask(e) {
    e.stopPropagation();
    props.deleteTask(props.index);
  }

  function onClickShowPopup() {
    props.onClickShowPopup(props);
  }

  return (
    <TaskItem onClick={onClickShowPopup}>
      <TaskText>{props.text}</TaskText>
      <DeleteTaskBtn type='button' onClick={onClickDeleteTask} aria-label='delete task'/>
    </TaskItem>
  )
}

export default Task;

const TaskItem = styled.li`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  border-bottom-right-radius: 3px;
  border-bottom: 1px solid black;
  
`

const TaskText = styled.p`
  font-size: 18px;
`

const DeleteTaskBtn = styled.button`
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
  
  &:hover {
    opacity: 0.6;
  }

  &:active {
    opacity: 0.8;
  }
`