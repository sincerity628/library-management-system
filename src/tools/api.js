import request from './request';

export default {
  // login
  login: (data) => request.post('/login', data),
};
