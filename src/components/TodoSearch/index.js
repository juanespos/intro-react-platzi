import React, { useContext, useState } from 'react';
import { TodoContext } from '../TodoContext';
import './TodoSearch.css';

export const TodoSearch = () => {

    const {search, setSearch} = useContext(TodoContext);

    return (
        <>
            <input 
                className='TodoSearch'
                placeholder='Cebolla'
                value = {search}
                onChange={(event) => {
                    console.log(event.target.value)
                    setSearch(event.target.value)
                }}
            />
        </>
    )
}
