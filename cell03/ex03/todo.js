function setCookie(name, value, days) {
  let d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  let cname = name + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i=0; i<ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
}

function saveTodos() {
  let todos = [];
  document.querySelectorAll(".todo").forEach(item => {
    todos.push(item.innerText);
  });
  setCookie("todos", JSON.stringify(todos), 7);
}

function loadTodos() {
  let data = getCookie("todos");
  if (data) {
    let todos = JSON.parse(data);
    todos.forEach(text => addTodo(text));
  }
}

function addTodo(text) {
  let div = document.createElement("div");
  div.className = "todo";
  div.innerText = text;

  div.onclick = function() {
    if (confirm("Do you want to remove this TO DO?")) {
      div.remove();
      saveTodos();
    }
  };

  document.getElementById("ft_list").appendChild(div);
  saveTodos();
}

document.getElementById("newBtn").addEventListener("click", function() {
  let task = prompt("Enter a new TO DO:");
  if (task && task.trim() !== "") {
    addTodo(task.trim());
  }
});

window.onload = loadTodos;