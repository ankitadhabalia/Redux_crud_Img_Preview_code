import * as types from './actionTypes';
import axios from 'axios';

const apiUrl = 'http://localhost:53543/api';

export function listAllCustomersSuccess(customers) {
  return {
    type: types.LIST_ALL_CUSTOMERS_SUCCESS,
    payload: customers
  };
}

export function deleteCustomerSuccess(msg) {
    return {
      type: types.DELETE_CUSTOMER_SUCCESS,
      payload: msg
    }
}

export function deleteOneCustomer(customerId) {
  return function(dispatch, getState) {
      return axios.delete(`${apiUrl}/Products/${customerId}`).then(response => {
        dispatch(deleteCustomerSuccess(response));
      })
  }
}

export function fetchAllCustomers(num) {
  console.log("Welcome by api");
  return function(dispatch) {
    return axios.get('http://localhost:53543/api/Products?&pageNumber='+ num +'&pageSize=4')
        .then(response => {
          console.log("Page response..",response.data);
        dispatch(listAllCustomersSuccess(response.data));
        })
      .catch(error => {
        throw error;
      });
  };
}

export function addNewCustomers(customers) {
  return function(dispatch) {
    console.log("Add new customer on submit from api ...",customers)
   
    return axios.post('http://localhost:53543/api/Products',customers)
        .then(response => {
        dispatch(listAllCustomersSuccess(response.data));
        })
      .catch(error => {
        throw error;
      });
  };
}

export function editCustomers(customers) {
  return function(dispatch) {
    console.log("Edit new customer on submit from api ..",customers)
    return axios.put('http://localhost:53543/api/Products',customers )
    .then(response => {
        dispatch(listAllCustomersSuccess(response.data));
        })
      .catch(error => {
        throw error;
      });
  };
}

export function searchAllCustomersSuccess(customers) {
  return {
    type: types.SEARCH_ALL_CUSTOMERS_SUCCESS,
    payload: customers
  };
}

export function search(data) {
  return function(dispatch) {
 // console.log("Search data from api...",data);
 
    return axios.get('http://localhost:53543/api/Products?QuerySearch=',data)
      .then(response => {
        dispatch(listAllCustomersSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
}
