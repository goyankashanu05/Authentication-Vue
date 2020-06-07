import axios from 'axios';

const BASEURL = 'https://apertum-interview.herokuapp.com/api/';

const apiCall = ({ url, method, data }) =>
  new Promise((resolve, reject) => {

    let headers = {}
    if(localStorage.getItem("user-token")) {
      headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("user-token")
      }
    } else {
      headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }
    try {
      axios({
        method: method,
        url: BASEURL + url,
        headers: headers,
        data
      }).then(function (response) {
        resolve(response.data)
      });
    } catch (err) {
      reject(new Error(err));
    }
  });

export default apiCall;
