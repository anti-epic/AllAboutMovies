import React, {useState} from "react";
import * as sessionActions from "../../store/session";
import {useDispatch} from "react-redux";
import {useModal} from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const {closeModal} = useModal();
    const history = useHistory()
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({credential, password})).then(history.push('/')).then(closeModal).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors){
              let errorMessage = Object.values(data.errors)
              setErrors(errorMessage);
            }

        });
    };

    return (<div className="loginContainer">
        <h1 className="loginHeader">Log In</h1>
        <form className="loginForm" onSubmit={handleSubmit}>
            <div className="errorContainer"> {errors.map((error, idx) => (<div key={idx}> {error}</div>))} </div>
            <label>
                Username or Email
                <input type="text"
                    value={credential}
                    onChange={
                        (e) => setCredential(e.target.value)
                    }
                    required/>
                    </label>
            <label>
                Password
                <input type="password"
                    value={password}
                    onChange={
                        (e) => setPassword(e.target.value)
                    }
                    required/>
                    </label>
            <button type="submit">Log In</button>
        </form>
    </div>);
}

export default LoginFormModal;
