import axios from "axios";

const token = "1|7JM0TfMkou4fON3cW8oBXKHtGW8UHqJapNp3kR4r";

export default axios.create({
  baseURL: "https://rental-soft.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`
  }
});