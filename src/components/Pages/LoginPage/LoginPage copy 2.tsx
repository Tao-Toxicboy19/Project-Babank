import React, { useState } from "react";
import axios from "axios";

type Props = {};

interface LoginData {
  username: string;
  password: string;
}

export default function LoginPage({}: Props) {
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loggedInUsername, setLoggedInUsername] = useState("");

  const handleLogin = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      event.preventDefault();
      axios
        .post("http://localhost:8080/login", loginData)
        .then((res) => {
          if (res.data.Login) {
            console.log("hello");
          } else {
            alert("no record");
          }
          console.log(res);
          
        })
        .catch((err) => console.log(err));

    } catch (error) {
      setError("Invalid username or password");
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: keyof LoginData
  ) => {
    const { value } = event.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [key]: value,
    }));
  };

  return (
    <div>
      <div className="w-full h-20"></div>
      <h2>LoginPage</h2>
      {loggedInUsername ? (
        <p>Welcome, {loggedInUsername}!</p>
      ) : (
        <div>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={loginData.username}
              onChange={(e) => handleInputChange(e, "username")}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => handleInputChange(e, "password")}
            />
          </div>
          <button onClick={handleLogin}>Login</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
    </div>
  );
}
