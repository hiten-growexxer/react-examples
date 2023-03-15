import React, { useState } from 'react';
import AddTodo from '../AddTodo';
import ListTodo from '../ListTodo/ListTodo';
import {Routes, Route } from 'react-router-dom';
export default function Main() {
  const [todo, setTodo] = useState([]);
  return (
    <div style={{}}>
        <Routes>
          <Route
            path="/home"
            element={
              <>
                <AddTodo setTodo={setTodo} />
                <ListTodo todo={todo} setTodo={setTodo} />
              </>
            }
          />
          <Route path="/add" element={<AddTodo setTodo={setTodo} />} />
          <Route
            path="/list"
            element={<ListTodo todo={todo} setTodo={setTodo} />}
          />
        </Routes>
    </div>
  );
}
