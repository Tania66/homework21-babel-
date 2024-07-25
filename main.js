const todos = JSON.parse(localStorage.getItem("todolist")) || [];

function createTodoList() {
  $(".js--todos-wrapper").empty();
  todos.forEach((todo) => {
    $(".js--todos-wrapper").append(
      `
    <li class="todo-item ${todo.completed ? "todo-item--checked" : ""}" >
        <input type="checkbox" id=${todo.id} ${todo.completed ? "checked" : ""}>
        <span class="todo-item__description">${todo.description}</span>
        <button class="todo-item__delete" id=${todo.id}>Видалити</button>
    </li>`
    );
  });
}

const handleAddTodo = (newTodo) => {
  const todo = {
    description: newTodo,
    completed: false,
    id: Math.random() * 100,
  };
  todos.push(todo);
  createTodoList();
};

$(document).ready(function () {
  createTodoList();

  $(".js--form").on("submit", function (event) {
    event.preventDefault();
    const newTodo = $(".js--form__input").val().trim();
    if (newTodo === "") return alert("Please enter todoshky)");
    handleAddTodo(newTodo);
    $(".js--form__input").val(" ");
    localStorage.setItem("todolist", JSON.stringify(todos));
  });

  $(document).on("click", ".todo-item__delete", function () {
    const clickId = $(this).attr("id");
    const index = todos.findIndex((todo) => todo.id === Number(clickId));
    if (index !== -1) {
      todos.splice(index, 1);
    }
    localStorage.setItem("todolist", JSON.stringify(todos));
    createTodoList();
  });

  $(document).on("change", "input[type=checkbox]", function () {
    const checkId = $(this).attr("id");
    todos.forEach((todo) => {
      if (todo.id === Number(checkId)) {
        todo.completed = !todo.completed;
      }
    });
    localStorage.setItem("todolist", JSON.stringify(todos));
    createTodoList();
  });

  $(document).on("click", ".todo-item__description", function () {
    const modalText = $(this).text();
    $("#textTodo").text(modalText);
    $("#todoModal").modal("show");
  });
});
