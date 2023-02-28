import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useModal} from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
import { useHistory } from "react-router-dom";
function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const {closeModal} = useModal();
    const history = useHistory()
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({
                email,
                username,
                firstName,
                lastName,
                password
            })).then(closeModal).then(history.push('/')).catch(async (res) => {
                const data = await res.json();
                if (data && data.errors){
                    let errorMessage = Object.values(data.errors)
                    setErrors(errorMessage);
                }

            });
        }
        return setErrors(['Confirm Password and Password do not match']);
    };

    return (<div className="signupContainer">
        <h1 className="signupHeader">Sign Up</h1>
        <form className="signupForm" onSubmit={handleSubmit}>
            <div className="errorContainer"> {
                errors.map((error, idx) => <div key={idx}> {error}</div>)
            } </div>
            <label>
                Email
                <input type="text"
                    value={email}
                    onChange={
                        (e) => setEmail(e.target.value)
                    }
                    required/>
            </label>
            <label>
                Username
                <input type="text"
                    value={username}
                    onChange={
                        (e) => setUsername(e.target.value)
                    }
                    required/>
            </label>
            <label>
                First Name
                <input type="text"
                    value={firstName}
                    onChange={
                        (e) => setFirstName(e.target.value)
                    }
                    required/>
            </label>
            <label>
                Last Name
                <input type="text"
                    value={lastName}
                    onChange={
                        (e) => setLastName(e.target.value)
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
            <label>
                Confirm Password
                <input type="password"
                    value={confirmPassword}
                    onChange={
                        (e) => setConfirmPassword(e.target.value)
                    }
                    required/>
            </label>
            <button type="submit">Sign Up</button>
        </form>
    </div>);
}

export default SignupFormModal;
