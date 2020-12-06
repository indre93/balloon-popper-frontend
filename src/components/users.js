class Users {
  constructor() {
    this.adapter = new UsersAdapter();
    this.fetchAndLoadUsers();
  }

  fetchAndLoadUsers() {
    this.adapter.getUsers()
      .then(users => {
        users.forEach(user => new User(user.id, user.username));
      });
  }
}
