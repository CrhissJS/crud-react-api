import axios from 'axios';
import React, { useState, useEffect } from 'react';

const UsersForm = ({ getUsers, userSelected, deselectUser, showForm, setShowForm }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [isVisible, setIsVisible] = useState(false)


    useEffect(() => {
        if (userSelected !== null) {
            setEmail(userSelected.email);
            setPassword(userSelected.password);
            setFirstName(userSelected.first_name);
            setLastName(userSelected.last_name);
            setBirthday(userSelected.birthday);
        }

    }, [userSelected])


    const reset = () => {
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setBirthday("");
    }
    const submit = e => {
        e.preventDefault();
        const user = {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
            birthday: birthday
        }

        console.log(user)

        if (userSelected !== null) {
            axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, user)
                .then(() => {
                    getUsers();
                    reset();
                    deselectUser();
                })
                .catch((error) => console.log(error.response));
        } else {
            axios.post("https://users-crud1.herokuapp.com/users/", user)
                .then(() => {
                    getUsers();
                    reset();
                })
                .catch((error) => console.log(error.response));
        }

        setShowForm(!showForm)

    }


    const showPassword = () => {
        setIsVisible(!isVisible)
    }

    const clear = () => {
        reset();
        deselectUser();
    }

    

    return (
        <div className="container-everything">
            <div className="form-container">
                <form >
                    <div style={{ display: "flex", flexDirection: "row-reverse", position: 'relative', left: "20px" }}>
                        <button onClick={() => setShowForm(!showForm)} style={{ border: "none", background: "lightseagreen", color: "white", width: "30px", height: "30px" }}>
                            <i className="bi bi-x"></i>
                        </button>
                    </div>

                    <div className="row mb-4" >
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="first-name">First name</label>
                                <input
                                    type="text"
                                    id="first-name"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="last-name">Last name</label>
                                <input
                                    type="text"
                                    id="last-name"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-outline mb-4">
                        <label htmlFor="email" className='for-label'>Email </label>
                        <input
                            style={{ marginTop: "10px" }}
                            type="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div className="form-outline mb-4">
                        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                            <label htmlFor="password" className='for-label'>Password </label>
                            <button className="btn btn-secondary btn-sm" style={{ border: "none", boxShadow: "1px 1px 4px rgba(0, 0, 0,  0.9)" }} onClick={showPassword} type="button">
                                Hide / Show {isVisible ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye"></i>}
                            </button>
                        </div>
                        <input
                            style={{ marginTop: "15px" }}
                            type={isVisible ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="form-control"
                        />

                    </div>
                    <div className="form-outline mb-4">
                        <label htmlFor="birthday" className='for-label'>Birthday </label>
                        <input
                            style={{ marginTop: "10px" }}
                            type="date"
                            id="birthday"
                            value={birthday}
                            onChange={e => setBirthday(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <button onClick={submit} type="submit" className="btn btn-primary btn-block mb-4">Submit</button>
                        <button type='button' className="btn btn-primary btn-block mb-4" onClick={clear}>Clear</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default UsersForm;