import axios from 'axios';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';

class Editstudent extends Component {
    state = {
        name : '',
        course : '',
        email : '',
        phone : '',
        error_list : [],
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    async componentDidMount(){

        const stud_id = this.props.match.params.id;
        // console.log(stud_id);

        const res = await axios.get(`http://127.0.0.1:8000/api/edit-student/${stud_id}`);
        if(res.data.status === 200)
        {
            // console.log(res.data.student);

            this.setState({
                name : res.data.student.name,
                course : res.data.student.course,
                email : res.data.student.email,
                phone : res.data.student.phone,
            });
           
        }
        else if(res.data.status === 404)
        {
            swal({
                title: "Warning!.",
                text: res.data.message,
                icon: "warning",
                button: "OK",
            });
            this.props.history.push('/');
        }

    }

    updateStudent = async (e) => {
        e.preventDefault();        

        const stud_id = this.props.match.params.id;
        // console.log(Stud_id);
        const res = await axios.put(`http://127.0.0.1:8000/api/update-student/${stud_id}`, this.state);
        // console.log(res.data.student);
        if(res.data.status === 200)
        {
            console.log(res.data.message);

            swal({
                title: "Success",
                text: res.data.message,
                icon: "success",
                button: "OK",
            });
            this.props.history.push('/');
        }
        else if(res.data.status === 404)
        {
            swal({
                title: "Warning!.",
                text: res.data.message,
                icon: "warning",
                button: "OK",
            });
            this.props.history.push('/');
        }
        else
        {
            this.setState({
                error_list : res.data.validate_err,
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
                                    Edit Student
                                    <Link to={'/'} className="btn btn-primary btn-sm float-end">BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.updateStudent}>
                                    <div className="form-group mb-3">
                                        <label className="form-label" for="name">Student Name</label>
                                        <input type="text" onChange={this.handleInput} value={this.state.name} name="name" className="form-control" />
                                        <span className="text-danger" >{this.state.error_list.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="form-label" for="name">Student Course</label>
                                        <input type="text" onChange={this.handleInput} value={this.state.course} name="course" className="form-control" />
                                        <span className="text-danger" >{this.state.error_list.course}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="form-label" for="name">Student Email</label>
                                        <input type="text" onChange={this.handleInput} value={this.state.email} name="email" className="form-control" />
                                        <span className="text-danger" >{this.state.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="form-label" for="name">Student Phone</label>
                                        <input type="text" onChange={this.handleInput} value={this.state.phone} name="phone" className="form-control" />
                                        <span className="text-danger" >{this.state.error_list.phone}</span>
                                    </div>
                                    <div className="form-group mb-3">                                        
                                        <button type="submit" name="phone" className="btn btn-success" id="updateBtn">Update Student</button>
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
 
export default Editstudent;