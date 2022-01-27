import axios from "axios";
import { bookApiKey } from "./keyApi";

export const bookListCreate = axios.create({
  // baseURL: `https://www.googleapis.com/books/v1/volumes?key=${bookApiKey}&q=`,
  baseURL: 'https://jsonplaceholder.typicode.com/users'
});