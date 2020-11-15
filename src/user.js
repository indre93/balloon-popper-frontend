class User {
  constructor(id, username) {
    this.id = id;
    this.username = username;
  }

  // instance method that will render the object to the DOM
  renderUser() {
    const usersDiv = document.getElementById('top-scores');
    const ul = document.createElement('ul');
    const li = document.createElement('li');

    usersDiv.append(ul);
    ul.append(li);
    li.innerHTML += `${this.username}`;
  }
}