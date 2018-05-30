import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as customerActions from '../../../actions/customerActions';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast} from 'react-toastify';
//import { Link } from 'react-router-dom';

class Edit extends Component {

    constructor(props) {
        super(props);
        console.log("Props ..", this.props);
        this.state = {
            id: this.props.location.data.id,
            jobTitleName: this.props.location.data.jobTitleName,
            firstName: this.props.location.data.firstName,
            lastName: this.props.location.data.lastName,
            phoneNumber: this.props.location.data.phoneNumber,
            emailAddress: this.props.location.data.emailAddress,
        };
        this.onSubmit = this.onSubmit.bind(this);                       //for submit
        this.onChange = this.onChange.bind(this);                       //for text change while edit
        this._handleImageChange = this._handleImageChange.bind(this);   //for image
        this.notify = this.notify.bind(this);                           //for notification on submit

    }

    onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log("Inside on Submit", this.state);
        this.props.actions.editCustomers(this.state);
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
            $imagePreview = (<img src={imagePreviewUrl} alt="foo" />);
        }

        return (
            <div className="container">
                <div className="panel panel-default">

                    <div className="panel-heading">
                        <h3 className="panel-title"> Edit Employee Details  </h3><br />
                    </div>
                    <div className="row">
                        {/* For adding images */}
                        <div className="col-sm-5">
                            <div className="form-group">
                                <div className="col-md-10">

                                    <form onSubmit={this._handleSubmit}>
                                        <input type="file" onChange={this._handleImageChange} className="form-control" width="280" /><br />
                                        <button type="submit" onClick={this._handleSubmit}>Upload Image</button>
                                    </form><br />
                                    {$imagePreview}

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
                                            <td>  <input type="text" className="form-control" name="id" value={this.state.id} onChange={this.onChange} placeholder="User Id" required="required" /> </td>
                                        </tr>

                                        <tr>
                                            <td><label for="">Job Title:</label></td>
                                            <td><input type="text" className="form-control" name="jobTitleName" value={this.state.jobTitleName} onChange={this.onChange} placeholder="Job Title" required="required" /></td>
                                        </tr>

                                        <tr>
                                            <td><label for="title">First Name:</label></td>
                                            <td><input type="text" className="form-control" name="firstName" value={this.state.firstName} onChange={this.onChange} placeholder="First Name" required="required" /></td>
                                        </tr>

                                        <tr>
                                            <td> <label for="author">Last Name:</label></td>
                                            <td> <input type="text" className="form-control" name="lastName" value={this.state.lastName} onChange={this.onChange} placeholder="Last Name" required="required"/></td>
                                        </tr>

                                        <tr>
                                            <td><label for="description">Mobile Number:</label></td>
                                            <td> <input type="text" className="form-control" name="phoneNumber" value={this.state.phoneNumber} onChange={this.onChange} placeholder="Mobile Number" required="required"/>   </td>
                                        </tr>

                                        <tr>
                                            <td> <label for="description">Email Address:</label></td>
                                            <td> <input type="text" className="form-control" name="emailAddress" value={this.state.emailAddress} onChange={this.onChange} placeholder="Email Address" required="required"/></td>
                                        </tr>

                                        <tr><td><button type="submit" className="btn btn-primary" onClick={this.notify}> Submit</button></td></tr>
                                    <ToastContainer/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Edit);