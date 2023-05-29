import { $authHost, $host } from './index';
import jwt_decode from 'jwt-decode';

export const registration = async (name, password) => {
  const { data } = await $host.post('api/user/registration/', {
    name,
    password,
  });
  localStorage.setItem('token', data.token);
  return jwt_decode(data.token);
};

export const logIn = async (name, password) => {
  const { data } = await $host.post('api/user/login/', { name, password });
  localStorage.setItem('token', data.token);
  return jwt_decode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get('api/user/auth/');
  localStorage.setItem('token', data.token);
  return jwt_decode(data.token);
};

export const getBooks = async () => {
  const { data } = await $authHost.post(`api/book/`);
  return data;
};

export const getCards = async () => {
  const { data } = await $authHost.get(`api/card/`);
  return data;
};

export const getAuthors = async () => {
  const { data } = await $authHost.post(`api/author/`);
  return data;
};

export const getFilterBooks = async (filters) => {
  const { data } = await $authHost.post(`api/book/filter`, { filters });
  return data;
};

export const getUsersCards = async (id) => {
  const { data } = await $authHost.post(`api/card/`, { id });
  return data;
};

export const createCard = async (bookID, userID) => {
  const { data } = await $authHost.post(`api/card/create`, { bookID, userID });
  return data.message;
};
