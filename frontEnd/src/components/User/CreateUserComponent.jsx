import React, { Component } from 'react'
import UserService from '../User/UserService';

class CreateUserComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // step 2
      _id: this.props.match.params._id,
      fields: {
        firstName: '',
        lastName: '',
        emailId: '',
        password: '',
        phoneNo: '',
        role: '',
        errorMessage: '',
      },
      errors: {}
    }
  }
  // step 3
  componentDidMount() {
    // step 4
    if (this.state._id === '_add') {
      return
    } else {
      UserService.getUserById(this.state._id).then((res) => {
        let fields = res.data;
        this.setState({ fields: fields });
      }).catch(err => {
        console.error(err.message)
      });;
    }
  }

  valid() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["firstName"]) {
      formIsValid = false;
      errors["firstNameError"] = "First Name is Required";
    }
    if (!fields["lastName"]) {
      formIsValid = false;
      errors["lastNameError"] = "Last Name is Required";
    }
    if (!fields["emailId"]) {
      formIsValid = false;
      errors["emailIdError"] = " Email Id is Required";
    }
    else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(fields["emailId"]))) {
      formIsValid = false;
      errors["emailIdError"] = "Invalid Email Id";
    }
    if (!fields["password"]) {
      formIsValid = false;
      errors["passwordError"] = "Password is Required";
    }
    if (!fields["phoneNo"]) {
      formIsValid = false;
      errors["phoneNoError"] = "Phone No is Required";
    }
    else {
      var mobPattern = /^[0-9]{10}$/;
      if (!mobPattern.test(fields["phoneNo"])) {
        formIsValid = false;
        errors["phoneNoError"] = "Invalid Phone No"
      }
      if (!fields["role"]) {
        formIsValid = false;
        errors["roleError"] = "RoleName is Required"
      }
    }
    this.setState({ errors: errors });
    return formIsValid;

  }

  saveOrUpdateUser = (e) => {
    e.preventDefault();
    if (this.valid()) {
      let user = { ...this.state.fields };
      // step 5 save data in database
      if (this.state._id === '_add') {
        UserService.createUser(user).then(res => {
          this.props.history.push('/users');
        }).catch(err => {
          console.error(err.message)
        });;
      } else {
        UserService.updateUser(user, this.state._id).then(res => {
          this.props.history.push('/users');
        }).catch(err => {
          console.error(err.message)
        });
      };
    }
  }

  handleChange = (e) => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({ fields });
  }

  cancel() {
    this.props.history.push('/users');
  }

  render() {
    const { firstName, lastName, emailId, password, phoneNo, role } = this.state.fields;
    return (
      <form>
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Add User</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Advanced Form</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <div className="card">

                  <div className="card-body">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-12">
                          <div className="col-md-8">
                            <div className="form-group">
                              <label htmlFor="firstName"> First Name: </label>
                              <input
                                type="text"
                                placeholder="First Name"
                                name="firstName"
                                className="form-control"
                                value={firstName}
                                onChange={this.handleChange}
                              />
                              <p style={{ color: "red", fontSize: "12px" }}>
                                {this.state.errors.firstNameError}
                              </p>
                            </div>
                            <div className="form-group">
                              <label> Last Name: </label>

                              <input
                                type="text"
                                placeholder="Last Name"
                                name="lastName"
                                className="form-control"
                                value={lastName}
                                onChange={this.handleChange}
                              />
                              <p style={{ color: "red", fontSize: "12px" }}>
                                {this.state.errors.lastNameError}
                              </p>
                            </div>
                            <div className="form-group">
                              <label> Email Id: </label>
                              <input
                                type="email"
                                placeholder="Email Address"
                                name="emailId"
                                className="form-control"
                                value={emailId}
                                onChange={this.handleChange}
                              />
                              <p style={{ color: "red", fontSize: "12px" }}>
                                {this.state.errors.emailIdError}
                              </p>
                            </div>
                            <div className="form-group">
                              <label> Password: </label>
                              <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                className="form-control"
                                value={password}
                                onChange={this.handleChange}
                              />
                              <p style={{ color: "red", fontSize: "12px" }}>
                                {this.state.errors.passwordError}
                              </p>
                            </div>

                            <div className="form-group">
                              <label> Phone No: </label>
                              <input
                                placeholder="Phone No"
                                name="phoneNo"
                                className="form-control"
                                value={phoneNo}
                                onChange={this.handleChange}
                              />
                              <p style={{ color: "red", fontSize: "12px" }}>
                                {this.state.errors.phoneNoError}
                              </p>
                            </div>
                            <div className="form-group">
                              <label> Role : </label>
                              <select
                                className="form-control"
                                value={role}
                                onChange={this.handleChange}
                                name="role"
                                style={{ width: "100%" }}

                              >

                                <option>--select--</option>
                                <option >Admin</option>
                                <option >Staff</option>
                              </select>

                            </div>

                            <button
                              className="btn btn-success"
                              onClick={this.saveOrUpdateUser}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={this.cancel.bind(this)}
                              style={{ marginLeft: "10px" }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default CreateUserComponent;
