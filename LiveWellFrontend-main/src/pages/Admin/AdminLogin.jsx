import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const FormContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 350px;
`;

const Header = styled.h2`
  background-color: #3498db;
  color: #fff;
  margin: 0;
  padding: 20px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const FormInput = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const PasswordInputContainer = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

const PasswordToggleButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #333;
  }
`;

const SubmitButton = styled.button`
  background-color: #3498db;
  color: #fff;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

const CreateAccountLink = styled.p`
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
  margin-bottom: 20px;

  a {
    color: #3498db;
    text-decoration: underline;

    &:hover {
      color: #2980b9;
    }
  }
`;

const SelectRole = styled.select`
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login clicked!");
    let result = await fetch("http://localhost:3000/api/admin/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (result.status === 400) {
      const errorData = await result.json();
      console.warn(errorData);
      toast.warning("Invalid Credentials", {
        position: "top-right",
      });
      return;
    }
  
    result = await result.json();
    console.warn(result);
    if (result.token) {
      localStorage.setItem("user", JSON.stringify(result.data));
      localStorage.setItem("token", JSON.stringify(result.token));
      toast.success("Login Successfully", {
        position: "top-right",
      });
      navigate(`/`);
    } else {
      toast.warning(result.error, {
        position: "top-right",
      });
    }
  };

  return (
    <CenteredContainer>
      <FormContainer>
        <Header>Login</Header>
        <LoginForm onSubmit={handleSubmit}>
          <FormInput
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInputContainer>
            <FormInput
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: 0 }}
            />
            <PasswordToggleButton
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </PasswordToggleButton>
          </PasswordInputContainer>
          <SelectRole value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
          </SelectRole>
          <SubmitButton type="submit">Login</SubmitButton>
        </LoginForm>
        <CreateAccountLink>
          Don't have an account? <Link to="/signup">Create Account</Link>
        </CreateAccountLink>
      </FormContainer>
    </CenteredContainer>
  );
};

export default AdminLogin;