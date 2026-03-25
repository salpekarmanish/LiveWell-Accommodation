import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import styled from 'styled-components';
import Notifications from './Notifications';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4B9CE2;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  &:hover {
    color: #4B9CE2;
  }
`;

const ScrollNavLink = styled(ScrollLink)`
  text-decoration: none;
  color: #333;
  cursor: pointer;
  &:hover {
    color: #4B9CE2;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  
  &.login {
    background: transparent;
    color: #333;
  }
  
  &.signup {
    background: #4B9CE2;
    color: white;
  }
  
  &.logout {
    background: #e74c3c;
    color: white;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user._id : null;
  const role = user?.role || 'user';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <Nav>
      <Logo to="/">LiveWell</Logo>
      {role !== 'admin' && (<NavLinks>
        <NavLink to="/property-search">Property</NavLink>
        {token && <NavLink to={`/profile/${userId}`}>Profile</NavLink>}
        {token && role === 'owner' && <NavLink to="/addFlat">Add Flat</NavLink>}
        <NavLink to="/complaints">Complaint</NavLink>
        <NavLink to="/about">About</NavLink>
        <ScrollNavLink to="footer" smooth={true} duration={500}>Contact</ScrollNavLink>
      </NavLinks>)}

      {role === 'admin' && (<>
        <NavLinks>
          <NavLink to="/property-search">Property</NavLink>
          <NavLink to="/admin/analysis">Analysis</NavLink>
          <NavLink to="/admin/verifyUser">VerifyUser</NavLink>
          <NavLink to="/admin/complaints">Complaint</NavLink>
          <NavLink to="/admin/searchUsers">SearchUsers</NavLink>
        </NavLinks>
      </>)
      }

      <AuthButtons>
        {token ? (
          <>
            <Button className="logout" onClick={handleLogout}>Logout</Button>
            <Notifications  userId={userId}/>
          </>
        ) : (
          <>
            <Button className="login" onClick={() => navigate('/signup')}>Sign Up</Button>
            <Button className="signup" onClick={() => navigate('/login')}>Login</Button>
          </>
        )}
      </AuthButtons>


    </Nav>
  );
};

export default Navbar;