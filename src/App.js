import React, { useState, useReducer } from 'react';
import './style.css';
import Modal from './Modal';

export default function App() {
  const [name, setName] = useState('');

  const preDefinedState = {
    isModalOpen: false,
    modalContent: '',
    people: [],
  };

  const handler = (state, action) => {
    if (action.type === 'addPerson') {
      return {
        ...state,
        modalContent: 'item added',
        isModalOpen: true,
        people: [...state.people, { id: action.id, name: action.name }],
      };
    } else if (action.type === 'closeModal') {
      return {
        ...state,
        modalContent: '',
        isModalOpen: false,
      };
    } else if (action.type === 'emptyName') {
      return {
        ...state,
        modalContent: 'item name empty',
        isModalOpen: true,
      };
    } else if (action.type === 'removePerson') {
      const newPeople = state.people.filter((person) => {
        return action.id != person.id;
      });
      console.log(newPeople);
      return {
        ...state,
        isModalOpen: true,
        modalContent: 'removed item',
        people: newPeople,
      };
    }
  };

  const [state, dispatch] = useReducer(handler, preDefinedState);

  function handleSubmit(e) {
    e.preventDefault();
    if (name) {
      dispatch({
        type: 'addPerson',
        name,
        id: new Date().getTime().toString(),
      });
      setName('');
    } else {
      dispatch({ type: 'emptyName' });
    }
  }

  function closeModal() {
    dispatch({ type: 'closeModal' });
  }

  return (
    <>
      <h1 className="head"> Enter List of Items </h1>
      {state.isModalOpen && (
        <Modal modalContent={state.modalContent} closeModal={closeModal} />
      )}
      {state.isModalOpen || <h1 className="test"> Hello </h1>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="personname"
          value={name}
          placeholder="enter item name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />{' '}
        <br />
        <button type="submit" className="add-item">
          {' '}
          Add Item{' '}
        </button>
      </form>
      {state.people.map((person) => {
        return (
          <div key={person.id} className="person">
            <h3> {person.name} </h3>
            <button
              onClick={(e) => {
                dispatch({ type: 'removePerson', id: person.id });
              }}
            >
              {' '}
              remove{' '}
            </button>
          </div>
        );
      })}
    </>
  );
}
