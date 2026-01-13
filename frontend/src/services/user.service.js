import axios from "axios";

export class UserService {
  url = "";

  constructor() {
    this.url = "https://notes-app-8qbj.onrender.com/auth/login";
  }

  async login(email, password) {
    const res = await axios.post(this.url, { email, password });
    return res.data;
  }
}
