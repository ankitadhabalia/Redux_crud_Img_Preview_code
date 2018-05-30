import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import * as customerActions from '../../../actions/customerActions';
import axios from 'axios';

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      jobTitleName: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      emailAddress: '',
      redirectToEdit: false,
      // prev:'',
      // next:'',
    };
    this.handleDelete = this.handleDelete.bind(this);     //for delete
    this.singleFind = this.singleFind.bind(this);         //for retrieving data in edit
    this.typeHead = this.typeHead.bind(this);             //for search text
    this.myFunction = this.myFunction.bind(this);         //for search button
    //  this.searchNotMatch = this.searchNotMatch.bind(this); //for search match of records
  }

  //retrieving of data for edit
  singleFind(e) {
    console.log("...Ankita Api", e.target.value);
    axios.get('http://localhost:53543/api/Products/' + e.target.value)
      .then(res => {
        this.setState({ product: res.data });
        console.log("Inside single file ", res);
        this.setState({
          id: res.data.id,
          jobTitleName: res.data.jobTitleName,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          phoneNumber: res.data.phoneNumber,
          emailAddress: res.data.emailAddress,
          redirectToEdit: true,

        })
      });
  }

  //delete function
  handleDelete(customerId) {
    this.props.actions.deleteOneCustomer(customerId)
      .then(response => {
        this.props.actions.fetchAllCustomers();
      });
  }

  //pagination function 
  page(num) {
    this.props.actions.fetchAllCustomers(num);
  }

  //searching by typehead
  typeHead(e) {
    e.preventDefault();
    // debugger;
    this.props.actions.search(e.target.value);
  }

  //searching by name and displaying on particular page 
  myFunction() {
    // debugger;
   
      var input, filter, table, tr, td, i;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      table = document.getElementById("myTable");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
          if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }
  

  render() {
    if (this.state.redirectToEdit) {
      return (<Redirect to={{
        pathname: "/edit1",
        data: this.state
      }}
      />);
    }

    const allCustomers = this.props.customers;

    return (
      <div>
        <center><h4 className="mb-4"> Customer Dashboard </h4></center>

        <h3><NavLink to={`/create1`}> Add Record </NavLink> </h3>


        {/* for searching of all the records */}
        <table className="table">
          <tbody>
            <tr>
              <td>
                <div class="col-md-12">
                  <input type="text" className="form-control" id="myInput" name="firstName" onBlur={this.typeHead} placeholder="Enter Your First Name" />
                </div>
              </td>
              <td>
                <button className="btn btn-info" onClick={this.myFunction}> Search </button>

              </td>
            </tr>
          </tbody>
        </table>

        {/* for listing of all the records */}
        <table className="table">
          <thead>
            <tr>
              <th>User Id</th>
              <th>Job Title</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="myTable">
            {allCustomers.map(customer => {
              return (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.jobTitleName}</td>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.phoneNumber}</td>
                  <td>{customer.emailAddress}</td>
                  <td>

                    <button type="button" className="btn btn-link" value={customer.id} onClick={this.singleFind}> Edit </button> |
                  <button type="button" className="btn btn-link" value={customer.id} onClick={() => this.handleDelete(customer.id)}> Delete </button>

                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <ul class="pagination">
          {/* <li class="page-item"><button class="page-link" onClick={this.page.bind(this, prev)}>Prev</button></li> */}
          <li class="page-item"><button class="page-link" onClick={this.page.bind(this, 1)}>1</button></li>
          <li class="page-item"><button class="page-link" onClick={this.page.bind(this, 2)}>2</button></li>
          <li class="page-item"><button class="page-link" onClick={this.page.bind(this, 3)}>3</button></li>
          <li class="page-item"><button class="page-link" onClick={this.page.bind(this, 4)}>4</button></li>
          <li class="page-item"><button class="page-link" onClick={this.page.bind(this, 5)}>5</button></li>
          {/* <li class="page-item"><button class="page-link" onClick={this.page.bind(this, next)}>Next</button></li> */}
        </ul>

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

export default connect(mapStateToProps, mapDispatchToProps)(Customer);