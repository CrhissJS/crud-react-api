import React from 'react';

const UsersList = ({ users, selectUser, deleteUser }) => {


    return (
        <div className="container-users-list">
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Remove</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Birthday</th>
                        <th>Reset</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        users.map(user => (
                            <tr key={user.id} className="card-car">
                                <td>
                                    <button onClick={() => deleteUser(user)} style={{ border: "none", background: "lightseagreen", color: "white", width: "30px", height: "30px" }}>
                                        <i className="bi bi-x"></i>
                                    </button>
                                </td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <input style={{ border: "none", textAlign: "center", background: "white" }} type="password" id="password" value={user.password} disabled />
                                </td>
                                <td>{user.birthday}</td>
                                <td>
                                    <button className="edit" onClick={() => selectUser(user)} style={{ background: "lightseagreen", color: "white", border: "none", margin: "10px" }}>Edit</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default UsersList;