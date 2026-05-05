import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://express-portifolio-orcin.vercel.app/'
});