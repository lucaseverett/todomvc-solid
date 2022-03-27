import { createSignal } from "solid-js";
import TodoItem from "./TodoItem";

function Main({
  todos,
  deleteTodo,
  updateTodo,
  completedCount,
  totalCount,
  toggleAll,
}) {
  const [editID, setEditID] = createSignal(null);

  function isChecked() {
    return totalCount() > 0 && completedCount() === totalCount();
  }

  function handleToggleAll() {
    toggleAll(isChecked() ? false : true);
  }

  return (
    <section class="main">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        checked={completedCount() === totalCount()}
        onChange={handleToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <For each={todos()}>
          {(todo) => (
            <TodoItem
              key={todo.id}
              {...{
                todo,
                deleteTodo,
                updateTodo,
                editID: () => editID(),
                setEditID,
              }}
            />
          )}
        </For>
      </ul>
    </section>
  );
}

export default Main;
