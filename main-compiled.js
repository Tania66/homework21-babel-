"use strict";

var todos = JSON.parse(localStorage.getItem("todolist")) || [];
function createTodoList() {
  $(".js--todos-wrapper").empty();
  todos.forEach(function (todo) {
    $(".js--todos-wrapper").append("\n    <li class=\"todo-item ".concat(todo.completed ? "todo-item--checked" : "", "\" >\n        <input type=\"checkbox\" id=").concat(todo.id, " ").concat(todo.completed ? "checked" : "", ">\n        <span class=\"todo-item__description\">").concat(todo.description, "</span>\n        <button class=\"todo-item__delete\" id=").concat(todo.id, ">\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438</button>\n    </li>"));
  });
}
var handleAddTodo = function handleAddTodo(newTodo) {
  var todo = {
    description: newTodo,
    completed: false,
    id: Math.random() * 100
  };
  todos.push(todo);
  createTodoList();
};
$(document).ready(function () {
  createTodoList();
  $(".js--form").on("submit", function (event) {
    event.preventDefault();
    var newTodo = $(".js--form__input").val().trim();
    if (newTodo === "") return alert("Please enter todoshky)");
    handleAddTodo(newTodo);
    $(".js--form__input").val(" ");
    localStorage.setItem("todolist", JSON.stringify(todos));
  });
  $(document).on("click", ".todo-item__delete", function () {
    var clickId = $(this).attr("id");
    var index = todos.findIndex(function (todo) {
      return todo.id === Number(clickId);
    });
    if (index !== -1) {
      todos.splice(index, 1);
    }
    localStorage.setItem("todolist", JSON.stringify(todos));
    createTodoList();
  });
  $(document).on("change", "input[type=checkbox]", function () {
    var checkId = $(this).attr("id");
    todos.forEach(function (todo) {
      if (todo.id === Number(checkId)) {
        todo.completed = !todo.completed;
      }
    });
    localStorage.setItem("todolist", JSON.stringify(todos));
    createTodoList();
  });
  $(document).on("click", ".todo-item__description", function () {
    var modalText = $(this).text();
    $("#textTodo").text(modalText);
    $("#todoModal").modal("show");
  });
});
