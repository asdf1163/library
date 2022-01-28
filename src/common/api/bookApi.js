import axios from "axios";

export const bookListCreate = axios.create({
  baseURL: `https://www.googleapis.com/books/v1/volumes`,
});