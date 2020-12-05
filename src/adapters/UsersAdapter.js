class UsersAdapter {
  constructor() {
    this.baseUrl = "http://localhost:3000/users";
  }

  getUsers() {
    return fetch(this.baseUrl).then(response => response.json());
  }
}
