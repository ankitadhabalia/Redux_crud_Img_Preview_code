import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as customerActions from '../../../actions/customerActions';
//import ReactCoreImageUpload from 'react-core-image-upload';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            jobTitleName: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            emailAddress: '',

            file: '',
            imagePreviewUrl: ''
        };
        this.onSubmit = this.onSubmit.bind(this);                       //for submit of form
        this.onChange = this.onChange.bind(this);                       //for changes while editing
        this._handleImageChange = this._handleImageChange.bind(this);   //for previewing of image
        this._handleSubmit = this._handleSubmit.bind(this);             //for image uploading
        this.notify = this.notify.bind(this);                           //for notification on submit

    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.actions.addNewCustomers(this.state);
    }

    _handleSubmit(e) {
        e.preventDefault();
        let data = {
            "file": "",
        }
        console.log('handle uploading-', this.state.file);
        axios.post('http://localhost:53543/api/Upload', data)
            .then(response => {
                this.setState({

                    messages: response.data
                });
            });
    }

    _handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }
    notify = () => toast("Saved Successsfully !");

    render() {

        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} alt="boo" />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        const { id, jobTitleName, firstName, lastName, phoneNumber, emailAddress } = this.state;
        return (
            <div className="container">
                <div className="panel panel-default">

                    <div className="panel-heading">
                        <h3 className="panel-title"> Add Employee </h3><br />
                    </div>
                    <div className="row">
                        {/* For adding images */}
                        <div className="col-sm-5">
                            <div className="form-group">

                                <div className="previewComponent">
                                    <form onSubmit={(e) => this._handleSubmit(e)}>
                                        <input className="fileInput" type="file" onChange={(e) => this._handleImageChange(e)} /><br /><br />
                                        <button className="submitButton" type="submit" onClick={(e) => this._handleSubmit(e)}>Upload Image</button>
                                    </form><br />
                                    <div className="imgPreview">
                                        {$imagePreview}
                                    </div>
                                    {/* <div>
                                        <ReactCoreImageUpload
                                            text="Upload Your Image"
                                            className='pure-button'
                                            inputOfFile="files"
                                            url='http://localhost:53543/api'
                                            imageUploaded={this.handleRes}>
                                        </ReactCoreImageUpload>
                                    </div> */}
                                </div>

                            </div>
                        </div>
                        {/* For adding form */}
                        <div className="col-sm-7">
                            <h3> <NavLink to={`/`}> Back to Employee List </NavLink></h3>
                            <form className="form-horizontal" onSubmit={this.onSubmit} >

                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>  <label for="description">User Id:</label> </td>
                                            <td>  <input type="text" className="form-control" name="id" value={id} onChange={this.onChange} placeholder="User Id" required="required" /> </td>
                                        </tr>

                                        <tr>
                                            <td><label for="">Job Title:</label></td>
                                            <td><input type="text" className="form-control" name="jobTitleName" value={jobTitleName} onChange={this.onChange} placeholder="Job Title" required="required"/></td>
                                        </tr>

                                        <tr>
                                            <td><label for="title">First Name:</label></td>
                                            <td><input type="text" className="form-control" name="firstName" value={firstName} onChange={this.onChange} placeholder="First Name" required="required"/></td>
                                        </tr>

                                        <tr>
                                            <td> <label for="author">Last Name:</label></td>
                                            <td> <input type="text" className="form-control" name="lastName" value={lastName} onChange={this.onChange} placeholder="Last Name" required="required"/></td>
                                        </tr>

                                        <tr>
                                            <td><label for="description">Mobile Number:</label></td>
                                            <td> <input type="text" className="form-control" name="phoneNumber" value={phoneNumber} onChange={this.onChange} placeholder="Mobile Number" required="required"/>   </td>
                                        </tr>

                                        <tr>
                                            <td> <label for="description">Email Address:</label></td>
                                            <td> <input type="text" className="form-control" name="emailAddress" value={emailAddress} onChange={this.onChange} placeholder="Email Address" required="required"/></td>
                                        </tr>

                                        <tr><td><button type="submit" className="btn btn-primary" onClick={this.notify} required="required"> Submit </button></td></tr>
                                        <ToastContainer />
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(customerActions, dispatch)
    };
}

function mapStateToProps(state, ownProps) {
    return {
        customers: state.customerReducer
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);