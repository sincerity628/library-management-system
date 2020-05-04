import request from './request';

export default {
  // login
  login: (data) => request.post('/login', data),
  // cip
  // is cip exist?
  isExist: (data) => request.post('/cip/isExist', data),
  addCip: (data) => request.post('/cip/addCip', data),
  deleteCip: (data) => request.post('/cip/deleteCip', data),
  // book
  addBook: (data) => request.post('/book/addBook', data),
  deleteBook: (data) => request.post('/book/deleteBook', data),
  borrowBook: (data) => request.post('/book/borrowBook', data),
  returnBook: (data) => request.post('/book/returnBook', data),
  reserveBook: (data) => request.post('/book/reserveBook', data),
  // get data
  getBorrow: () => request.get('/manager/getBorrow'),
  getCip: () => request.get('/manager/getCip'),
  getReserve: () => request.get('/manager/getReserve'),
};
