import React, { useState, useEffect } from 'react';
import './normalize.css';
import './reset.css'
import './App.css';
import './utils/getRandomId';
import styled from 'styled-components';
import getRandomId from './utils/getRandomId';
import LoginForm from './components/LoginForm';
import NewDeskForm from './components/NewDeskForm';
import Desk from './components/Desk';

function App() {
  const [popupVisibility, setPopupVisibility] = useState(true);
  const [headerUserName, setHeaderUserName] = useState('');
  const [desks, setNewDesk] = useState([]);

  useEffect(() => {
    const tempDesksArray = localStorage.getItem('desks');
    const lastUser = localStorage.getItem('lastUser');

    if (tempDesksArray) {
      setNewDesk(JSON.parse(tempDesksArray));
    }

    if (lastUser) {
      setPopupVisibility(false);
      setHeaderUserName(lastUser);
    }
  }, []);

  function handleSubmitChangePopupVisibility(userName) {
    const userNameResponse = localStorage.getItem(userName);

    function createNewUser(userName) {
      const newUser = {name: userName, id: getRandomId()};
      localStorage.setItem(userName, JSON.stringify(newUser));
      localStorage.setItem('lastUser', userName);
    }

    if (userNameResponse) {
      const parsedUserNameResponse = JSON.parse(userNameResponse);
      setHeaderUserName(parsedUserNameResponse.name);
    } else {
      createNewUser(userName);
      setHeaderUserName(userName);
    }

    setPopupVisibility(false);
  }

  function onClickRemoveAllDesks() {
    localStorage.removeItem('desks');
    localStorage.removeItem('tasks');
    setNewDesk([]);
  }

  function onSubmitAddNewDesk(deskName) {
    const desksResponse = localStorage.getItem('desks');

    function createNewDesk(deskName) {
      const newDesk = [{name: deskName, id: getRandomId()}];
      setNewDesk(newDesk);
      localStorage.setItem('desks', JSON.stringify(newDesk));
    }

    if (desksResponse) {
      const cloneDesksResponse = JSON.parse(desksResponse);

      cloneDesksResponse.push({name: deskName, id: getRandomId()});
      setNewDesk(cloneDesksResponse);

      localStorage.setItem('desks', JSON.stringify(cloneDesksResponse));
    } else {
      createNewDesk(deskName);
    }
  }

  function onClickRemoveDesk(deskIndex) {
    const desksResponse = localStorage.getItem('desks');
    const cloneDesksResponse = JSON.parse(desksResponse);

    cloneDesksResponse.splice(deskIndex, 1);
    setNewDesk(cloneDesksResponse);

    localStorage.setItem('desks', JSON.stringify(cloneDesksResponse));
  }

  function onSubmitChangeDeskname(newDeskName, index) {
    const desksResponse = localStorage.getItem('desks');
    const newDesks = JSON.parse(desksResponse);

    newDesks[index].name = newDeskName;
    setNewDesk(newDeskName);

    localStorage.setItem('desks', JSON.stringify(newDesks));
  }

  return (
    <Container>
      {popupVisibility ? (
        <LoginForm onFormSubmit={handleSubmitChangePopupVisibility}/>
      ) : (
        <>
          <HeaderWrapper>
            <Header>Hello, {headerUserName}!</Header>
            <ChangeUserBtn onClick={() => setPopupVisibility(true)}>Change user</ChangeUserBtn>
            <NewDeskForm onSubmit={onSubmitAddNewDesk}/>
            <RemoveAllDesksBtn onClick={onClickRemoveAllDesks}>Remove all desks</RemoveAllDesksBtn>
          </HeaderWrapper>
          <DesksWrapper>
            {desks.map((desk, index) => 
              <Desk 
                userName={headerUserName}
                header={desk.name} 
                id={desk.id} 
                index={index} 
                key={index} 
                onSubmit={onSubmitChangeDeskname}
                onClickRemoveDesk={onClickRemoveDesk}
              />)
            }
          </DesksWrapper>
        </>
      )}
    </Container>
  );
}

export default App;

const Container = styled.div`
  margin: 0 auto;
  padding-top: 30px;
  width: 1440px;
  font-family: 'Gilroy';
`

const HeaderWrapper = styled.div`
  margin: 0 auto 30px;
  width: fit-content;
  display: flex;
`

const Header = styled.h1`
  margin: 0;
  margin-right: 20px;
  font-size: 36px;
  line-height: normal;
  font-weight: 800;
`

const ChangeUserBtn = styled.button`
  margin-right: 15px;
  padding: 3px 10px;
  font-size: 20px;
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

const RemoveAllDesksBtn = styled.button`
  padding: 3px 10px;
  font-size: 20px;
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

const DesksWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`