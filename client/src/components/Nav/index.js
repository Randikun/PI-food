import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './nav.module.css'
import * as MdIcons from 'react-icons/md' 
import * as ImIcons from 'react-icons/im' 
import * as VscIcons from 'react-icons/vsc' 








export default function NavBar() {

    const checkActive = (match, location) => {
        //some additional logic to verify you are in the home URI
        if(!location) return false;
        const {pathname} = location;
        console.log(pathname);
        return pathname === "/";
    }
    
    return (
        <div className={`${s.nav}`}>
            
               
                    <div className={`${s.container}`}>
                        <NavLink to="/home"  ><ImIcons.ImHome className={`${s.icon}`}/></NavLink>
                        <div  className={`${s.right}`}>
                         <NavLink to="/favorites"  ><MdIcons.MdFavorite className={`${s.icon}`}/></NavLink>
                         <NavLink to="/addRecipe" ><MdIcons.MdAddCircleOutline className={`${s.icon}`}/></NavLink>                      
                         <NavLink to="/shoppingList"  ><VscIcons.VscChecklist className={`${s.icon}`}/></NavLink>
                        </div>

                    </div>
                
            
        </div>
    )
}