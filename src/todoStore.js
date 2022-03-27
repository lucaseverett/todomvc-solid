import useHash from "./useLocation";
import useLocalStorage from "./useLocalStorage";

export default function store() {
  const [todos, setTodos] = useLocalStorage("todos-solid", []);
  const hash = useHash();

  function nextID() {
    return (
      todos()
        .map(({ id }) => id)
        .reduce((a, b) => Math.max(a, b), 0) + 1
    );
  }

  function addTodo(todo) {
    todo.id = nextID();
    setTodos([...todos(), todo]);
  }

  function updateTodo(update) {
    setTodos(todos().map((todo) => (todo.id === update.id ? update : todo)));
  }

  function deleteTodo(id) {
    setTodos(todos().filter((todo) => todo.id !== id));
  }

  function clearCompleted() {
    setTodos(todos().filter((todo) => !todo.completed));
  }

  function toggleAll(completed) {
    setTodos(todos().map((todo) => ({ ...todo, completed })));
  }

  function filter(filter) {
    return {
      all: todos(),
      active: todos().filter((todo) => !todo.completed),
      completed: todos().filter((todo) => todo.completed),
    }[filter];
  }

  return {
    todos: () => filter(hash()),
    activeCount: () => filter("active").length,
    completedCount: () => filter("completed").length,
    totalCount: () => todos().length,
    hash,
    addTodo,
    clearCompleted,
    deleteTodo,
    updateTodo,
    toggleAll,
  };
}
