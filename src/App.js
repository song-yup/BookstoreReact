import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import Books from '././pages/books.js';
import Book from '././pages/book.js';
import Home from '././pages/home.js';
import LogIn from './pages/login.js';
import AddBook from './pages/addBook.js';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {  
    return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/book/:id" element={<Book />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/add" element={<AddBook />} />
      </Routes>
    </Router>
    );
}

export default App;
