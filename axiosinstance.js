// import axios from 'axios';

// const axiosinstance = axios.create({
//   baseURL: 'http://localhost:3002', // Ensure this matches your backend URL
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// export default axiosinstance;
import axios from 'axios';

const axiosinstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Your Django backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosinstance;

// // export default axiosinstance;
// const axiosinstance = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api/',  // matches your backend route
//   headers: {
//     'Content-Type': 'application/json',
//   }
// });


