import axios from "axios";
import { bookApiKey } from "./keyApi";

//https://www.googleapis.com/books/v1/volumes?q=why%20we%20sleep+inauthor:Walker

export const bookListCreate = axios.create({
  baseURL: `https://www.googleapis.com/books/v1/volumes?key=${bookApiKey}&q=`,
});