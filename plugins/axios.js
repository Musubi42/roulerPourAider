// // src/services/api.js
// import axios from "axios";

// export default ({ app }, inject) => {
//   constructor() {
//     this.http = axios.create({
//       baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
//       // baseURL: `http://localhost:4000/api`,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     this.http.interceptors.response.use(
//       (response) => response,
//       (error) => {
//         return Promise.reject(error);
//       }
//     );
//   }

//   setToken(token) {
//     this.http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   }

//   async get(url, params) {
//     try {
//       const response = await this.http.get(url, { params });
//       return [null, response.data];
//     } catch (error) {
//       return [error, null];
//     }
//   }

//   async post(url, body, params) {
//     try {
//       const response = await this.http.post(url, body, { params });
//       // console.log(response);
//       // response.status = response.status;
//       return [null, response.data];
//     } catch (error) {
//       return [error, null];
//     }
//   }

//   async put(url, body, params) {
//     try {
//       const response = await this.http.put(url, body, { params });
//       return [null, response.data];
//     } catch (error) {
//       return [error, null];
//     }
//   }

//   async patch(url, body, params) {
//     try {
//       const response = await this.http.patch(url, body, { params });
//       return [null, response.data];
//     } catch (error) {
//       return [error, null];
//     }
//   }

//   async delete(url, body, params) {
//     try {
//       const response = await this.http.delete(url, { params });
//       return [null, response.data];
//     } catch (error) {
//       return [error, null];
//     }
//   }

//   inject('api', api);
// };
