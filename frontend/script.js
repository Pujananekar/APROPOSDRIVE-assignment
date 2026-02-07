function loadUsers() {
  fetch("/users")
    .then(res => res.json())
    .then(data => {
      const ul = document.getElementById("users");
      ul.innerHTML = "";
      data.forEach(u => {
        const li = document.createElement("li");
        li.innerText = `${u.name} - ${u.email}`;
        ul.appendChild(li);
      });
    })
    .catch(err => alert("Backend not reachable"));
}

