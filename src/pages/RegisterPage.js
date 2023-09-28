import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function ReisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [membertype, setMembertype] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function register(ev) {
    ev.preventDefault();
    console.log(ev);
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password, membertype }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      alert("Successfully Register!");
      console.log(membertype);
      setRedirect(true);
    } else {
      alert("Registration failed");
    }
  }
  if (redirect) {
    return <Navigate to={"/login"} />;
  }
  return (
    <form class="register" onSubmit={register}>
      <h2>Create an Account</h2>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />

      <label>Register as: </label>
      <select
        name="member"
        value={membertype}
        onChange={(ev) => setMembertype(ev.target.value)}
      >
        <option value="shopper">shopper</option>
        <option value="merchant">merchant</option>
      </select>
      <br></br>
      <br></br>
      <button>Register</button>
    </form>
  );
}
