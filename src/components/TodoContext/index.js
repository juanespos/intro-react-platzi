import React, { useState } from 'react';
import { createContext } from 'react';

import {useLocalStorage}  from './useLocalStorage';



const TodoContext = createContext();

const TodoProvider = (props) => {

    const {
        item: todos,
        saveItem: saveTodos,
        loading,
        error,
      } = useLocalStorage('TODOS_v1', []);
    
    
      const [search, setSearch] = useState('');

      const [openModal, setOpenModal] = useState(false)
    
      const completedTodos = todos.filter(todo => !!todo.completed).length;
      const totalTodos = todos.length;
    
      let searchedTodos = [];
    
      if (!search.length >= 1) {
        searchedTodos = todos;
      } else {
        searchedTodos = todos.filter(todo => {
          const todoText = todo.text.toLowerCase();
          const searchText = search.toLowerCase();
          return todoText.includes(searchText);
        });
      }
    
    
    
      const addTodo = (text) => {
    
        const newTodos = [...todos];
    
        newTodos.push({
          'id': ((newTodos.length > 0) ? newTodos[newTodos.length - 1].id + 1: 0), 'text': text, 'completed': false
        });
    
        saveTodos(newTodos);
      }

      const completeTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text);
    
        const newTodos = [...todos];
    
        newTodos[todoIndex].completed = true;
    
        saveTodos(newTodos);
      }
    
      const deleteTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos];
    
        newTodos.splice(todoIndex, 1);
    
        saveTodos(newTodos);
    
      }

    return(
        <TodoContext.Provider value={{
            totalTodos,
            completedTodos,
            search,
            setSearch,
            searchedTodos,
            addTodo,
            completeTodo,
            deleteTodo,
            loading,
            error,
            openModal,
            setOpenModal,
        }}
        >
            {props.children}
        </TodoContext.Provider>
    )
}

export {TodoContext, TodoProvider};