import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }
console.log(user);
  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Milton Academy</h2>
      </Link>
      <div>
        <Link className="navLink" to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>

        {user.id && (
          <>
          {/*
            <Link className="navLink" to="/info">
              Info Page
          </Link> */}
            <LogOutButton className="navLink" />
            <Link className="navLink" to="/results">
              Quiz Results
        </Link>
        { user.admin == false ? <Link></Link>:
            <Link className="navLink" to="/form">
              Create
        </Link>
          }
          </>
        )}
        <Link className="navLink" to="/quiz">
          Quiz
        </Link>
        <Link className="navLink" to="/flashcards">
          Flashcards
        </Link>
        <Link className="navLink" to="/match">
          Match
        </Link>

        

        
        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
