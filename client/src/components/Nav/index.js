import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from "../SearchBar";



import './Navbar.css';

export default function NavBar() {
    return (
        <header className="navbar">
            <nav>
                <ul>
                    <li>
                        <NavLink exact to="/home" >Home</NavLink>
                        <NavLink to="/favorites" >Favoritas</NavLink>
                        <NavLink to="/addRecipe" >+</NavLink>
                        <NavLink to="/shoppingList" >ShoppingList</NavLink>

                    </li>
                    <li>
                        <SearchBar/>
                    </li>
                </ul>
            </nav>
        </header>
    )
}