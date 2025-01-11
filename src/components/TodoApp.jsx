import { useState, useEffect } from "react";

import "./TodoApp.css";

const TodoApp = () => {
  // Lista de tarefas
  const [todos, setTodos] = useState([]);

  // Estado de texto da tarefa
  const [inputValue, setInputValue] = useState("");

  //Estado para confirmar a exclusão de uma tarefa
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Carregar tarefas do localStorage quando o componente for montado
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  // Salvar tarefas no localStorage sempre que a lista de tarefas for alterada
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  // Limpar o localStorage quando todas as tarefas forem excluídas
  useEffect(() => {
    if (todos.length === 0) {
      localStorage.removeItem("todos");
    }
  }, [todos]);

  // Adicionar tarefa
  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
      };

      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInputValue("");
    }
  };

  // Função para lidar com o clique no botão de exclusão
  const handleDeleteClick = (todoId) => {
    // Define a tarefa a ser excluída
    setConfirmDelete(todoId);
  };

  // Função para confirmar a exclusão
  const confirmDeleteTask = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
    //  Limpa o estado de confirmação
    setConfirmDelete(null);
  };

  // Função para cancelar a exclusão
  const cancelDelete = () => {
    // Limpa o estado de confirmação
    setConfirmDelete(null);
  };

  return (
    <div className="app-container">
      <h1 className="title">Lista de Tarefas</h1>
      {/* Form para adicionar tarefas */}
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          className="input-field"
          placeholder="Adicione uma tarefa..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="add-button">
          Adicionar
        </button>
      </form>
      {/* Lista de tarefas */}
      {todos.length === 0 && <p className="empty">Não há tarefas.</p>}

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {todo.text}
            {/* Exibe o botão de excluir ou a confirmação */}
            {confirmDelete !== todo.id && (
              <button
                className="delete-button"
                onClick={() => handleDeleteClick(todo.id)}
              >
                Excluir
              </button>
            )}

            {/* Confirmaçao de exclusão */}
            {confirmDelete === todo.id && (
              <div className="confirmation">
                <p>Você tem certeza?</p>
                <button
                  onClick={() => confirmDeleteTask(todo.id)}
                  className="confirm-button"
                >
                  Sim
                </button>
                <button onClick={cancelDelete} className="cancel-button">
                  Não
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
