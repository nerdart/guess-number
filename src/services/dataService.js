import axios from 'axios';
import { setItem } from './localStorage';
const BASE_API = "https://guessno-eavilztayp.now.sh/";

export const LoginUser = (usercreds) => {
	return axios.post(`${BASE_API}login`, usercreds)
  .then(function (response) {
    if(response.data) {
      if(response.data.code) {
        setItem(response.data.code, 'token');
      }
      return response.data;
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

export const ValidateUserUniqueId = (code) => {
	return axios.post(`${BASE_API}guess`, code)
  .then(function (response) {
    if(response.data) {
      return response.data;
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

export const getGuessCount = (code) => {
	return axios.post(`${BASE_API}guess/count`, code)
    .then(function (response) {
      if(response.data) {
        return response.data;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}