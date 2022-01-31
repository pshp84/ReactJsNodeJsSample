import React, { Component } from 'react'
import UserService from '../User/UserService'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

class ListUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: []
        }
        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount() {
        UserService.getUsers().then((res) => {
            this.setState({ users: res.data });
        }).catch(err => {
            console.error(err.message)
        });;
    }

    deleteUser(_id) {
        let a = window.alert("Are you sure you want to delete this record ?");
        if (a === true) {
            UserService.deleteUser(_id).then(res => {
                this.setState({ users: this.state.users.filter(user => user._id !== _id) });

            }).catch(err => {
                console.error(err.message)
            });;
        }
    }

    editUser(_id) {
        this.props.history.push(`/add-user/${_id}`);
    }

    addUser() {
        this.props.history.push('/add-user/_add');
    }

    render() {
        return (
            <div>
                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <button className="btn btn-primary" onClick={this.addUser}> Add New +</button>

                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="/">Home</a></li>

                                    </ol>
                                </div>
                            </div>
                        </div>{/* /.container-fluid */}
                    </section>

                    <section className="content">
                        <br></br>
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3>User</h3>
                                    </div>
                                    <div className="card-body">
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th> Actions</th>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Email Id</th>
                                                    <th>Password</th>
                                                    <th>PhoneNo</th>
                                                    <th>RoleName</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.users.map(
                                                        user =>
                                                            <tr key={user._id}>
                                                                <td>
                                                                    <Tippy arrow={false} placement="bottom" content="Edit">

                                                                        <button onClick={() => this.editUser(user._id)} className="btn btn-light">
                                                                            <i className="fas fa-user-edit" ></i>
                                                                        </button>
                                                                    </Tippy>
                                                                    <Tippy arrow={false} placement='bottom' content="Delete">
                                                                        <button style={{ marginLeft: "1px" }} onClick={() => this.deleteUser(user._id)} className="btn btn-light">
                                                                            <i class="fas fa-trash-alt" ></i>
                                                                        </button>
                                                                    </Tippy>
                                                                </td>
                                                                <td> {user.firstName} </td>
                                                                <td> {user.lastName}</td>
                                                                <td> {user.emailId}</td>
                                                                <td> {user.password}</td>
                                                                <td> {user.phoneNo}</td>
                                                                <td> {user.roleName}</td>
                                                            </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                </div>

            </div>
        )
    }
}

export default ListUserComponent
