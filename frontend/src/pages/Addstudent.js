import axios from 'axios';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Addstudent extends Component {
    state = {
        name : '',
        course : '',
        email : '',
        phone : '',
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    saveStudent = async (e) => {
        e.preventDefault();
        
        const res = await axios.post('http://127.0.0.1:8000/api/add-student', this.state);
        if(res.data.status === 200)
        {
            console.log(res.data.message);
            this.setState({
                name : '',
                course : '',
                email : '',
                phone : '',
            });
        }

    }

    render() { 
        return (
            <div className="container">
                <div className="row">
                    <div className="col col-md-6 mx-auto">
                        <div className="card">
                            <div className="card-header">
                                <h4>
                                    Add Student
                                    <Link to={'/'} className="btn btn-primary btn-sm float-end">BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.saveStudent}>
                                    <div className="form-group mb-3">
                                        <label className="form-label" for="name">Student Name</label>
                                        <input type="text" onChange={this.handleInput} value={this.state.name} name="name" className="form-control" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="form-label" for="name">Student Course</label>
                                        <input type="text" onChange={this.handleInput} value={this.state.course} name="course" className="form-control" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="form-label" for="name">Student Email</label>
                                        <input type="text" onChange={this.handleInput} value={this.state.email} name="email" className="form-control" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="form-label" for="name">Student Phone</label>
                                        <input type="text" onChange={this.handleInput} value={this.state.phone} name="phone" className="form-control" />
                                    </div>
                                    <div className="form-group mb-3">                                        
                                        <button type="submit" name="phone" className="btn btn-primary">Save Student</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Addstudent;