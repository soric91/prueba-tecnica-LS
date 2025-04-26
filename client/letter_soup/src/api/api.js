import axios from 'axios';
import { API_URL } from '../config';

export const saveLetterSoup = async (soup) => {
  return axios.post(`${API_URL}/lettersoup/save`, soup);
};

export const resolveLetterSoup = async (data) => { 
  return axios.post(`${API_URL}/lettersoup/resolve`, data);
}