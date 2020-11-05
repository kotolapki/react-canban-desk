import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import getRandomId from '../../utils/getRandomId';
import Task from '../Task';
import TaskPopup from '../TaskPopup';
import ChangeDeskHeaderForm from '../ChangeDeskHeaderForm';
import AddNewTaskForm from '../AddNewTaskForm';

function Desk(props) {
  const [inputVisibility, setInputVisibility] = useState(false);
  const [tasks, setNewTask] = useState();
  const [taskPopupVisibility, setTaskPopupVisibility] = useState(false);
  const [taskData, setTaskData] = useState();

  useEffect(() => {
    const localTasks = localStorage.getItem('tasks');

    if (localTasks) {
      const parsedTasks = JSON.parse(localTasks);

      setNewTask(parsedTasks[props.index]);
    }
  }, [props.index]);

  function onClickRemoveDeskHandler() {
    props.onClickRemoveDesk(props.index);
  }

  function onSubmitChangeHeader(e) {
    setInputVisibility(false);
    let index = props.index;
    props.onSubmit(e.newDeskName, index);
  }

  function onSubmitAddNewTask(e) {
    const deskIndex = props.index;
    const localTasks = localStorage.getItem('tasks');

    function createNewTask() {
      const newTask = {author: props.userName, text: e.newTask, id: getRandomId()};

      return newTask;
    }

    if (localTasks) {
      const parsedTasks = JSON.parse(localTasks);

      if (parsedTasks[deskIndex] === null || parsedTasks[deskIndex] === undefined) {
        parsedTasks[deskIndex] = [];
      }

      parsedTasks[deskIndex].push(createNewTask());
      setNewTask(parsedTasks[deskIndex]);
      localStorage.setItem('tasks', JSON.stringify(parsedTasks));
    } else {
      const localTasks = [];
      localTasks[deskIndex] = [createNewTask()];
      setNewTask(localTasks[deskIndex]);
      localStorage.setItem('tasks', JSON.stringify(localTasks));
    }
    e.newTask = '';
  }

  function onClickDeleteTask(taskIndex) {
    const deskIndex = props.index;
    const localTasks = localStorage.getItem('tasks');
    const parsedTasks = JSON.parse(localTasks);

    parsedTasks[deskIndex].splice(taskIndex, 1);
    setNewTask(parsedTasks[deskIndex]);
    localStorage.setItem('tasks', JSON.stringify(parsedTasks));
  }

  function onClickChangeInputVisibility() {
    setInputVisibility(true);
  }

  function onClickHideInput(e) {
    if (inputVisibility && e.target.name !== 'newDeskName') {
      setInputVisibility(false);
    }
  }

  function onClickShowTaskPopup(props) {
    setTaskPopupVisibility(true);
    setTaskData(props);
  }

  function onClickHideTaskPopup(e) {
    if (e.target.id === 'overlay' || e.target.id === 'hidePopupBtn') {
      setTaskPopupVisibility(false);
    }
  }

  return (
    <DeskContainer onClick={onClickHideInput}>
      {taskPopupVisibility && 
        <TaskPopup 
          taskData={taskData}
          userName={props.userName} 
          index={props.index} 
          deskName={props.header} 
          onClickHideTaskPopup={onClickHideTaskPopup}
        />
      }
      {inputVisibility ? 
        <ChangeDeskHeaderForm 
          placeholder={props.header}
          onSubmit={onSubmitChangeHeader}
        />
        :
        <DeskHeaderWrapper>
          <DeskHeader onClick={onClickChangeInputVisibility}>{props.header}</DeskHeader>
          <DeskHeaderBtn type='button' aria-label='remove desk' onClick={onClickRemoveDeskHandler}>Remove desk</DeskHeaderBtn>
        </DeskHeaderWrapper>
      }
      <AddNewTaskForm onSubmit={onSubmitAddNewTask}/>
      <ul>
        {tasks && tasks.map((task, index) => 
          <Task 
            author={task.author}
            key={index} 
            index={index} 
            text={task.text} 
            id={task.id} 
            onClickShowPopup={onClickShowTaskPopup} 
            deleteTask={onClickDeleteTask}
          />)
        }
      </ul>
    </DeskContainer>
  )
}

export default Desk;

const DeskContainer = styled.div`
  margin-right: 7px;
  margin-bottom: 20px;
  padding: 10px;
  min-width: 300px;
  height: fit-content;
  background-color: snow;
  border: 2px solid black;
  border-radius: 10px;

  &:nth-child(4n) {
    margin-right: 0;
  }
`

const DeskHeaderWrapper = styled.div`
  margin-bottom: 10px;    
  display: flex;
  justify-content: flex-end;
`

const DeskHeader = styled.h2`
  margin-right: 25px;
  font-size: 24px;
  font-weight: 800;
  text-align: center;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }

  &:active {
    opacity: 0.8;
  }
`

const DeskHeaderBtn = styled.button`
  padding: 3px 5px;
  font-size: 16px;
  text-transform: uppercase;
  color: white;
  background-color: black;
  border: none;
  border-radius: 5px;

  &:hover {
    opacity: 0.6;
  }

  &:active {
    opacity: 0.8;
  }
`
