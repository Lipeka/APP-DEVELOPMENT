import axios from 'axios';

const axiosinstance = axios.create({
  baseURL: 'http://localhost:3002', 
  headers: {
    'Content-Type': 'application/json'
  }// Replace with your JSON server or backend URL
});

export default axiosinstance;