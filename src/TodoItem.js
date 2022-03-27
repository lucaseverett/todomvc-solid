import { createSignal } from "solid-js";

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

function TodoItem({
  todo: { id, title, completed },
  deleteTodo,
  updateTodo,
  editID,
  setEditID,
}) {
  const [editedTitle, setEditedTitle] = createSignal(title);

  function handleChange(e) {
    setEditedTitle(e.target.value);
  }

  function handleKeyUp(e) {
    if (e.keyCode === ENTER_KEY) {
      if (!editedTitle().trim()) {
        handleDelete();
      } else {
        handleUpdate();
      }
    } else if (e.keyCode === ESCAPE_KEY) {
      handleEscape();
    }
  }

  function handleToggle() {
    updateTodo({
      id,
      title,
      completed: !completed,
    });
  }

  function handleEdit() {
    setEditID(id);
  }

  function handleUpdate() {
    updateTodo({ id, title: editedTitle().trim(), completed });
    setEditID(null);
  }

  function handleBlur() {
    handleUpdate();
  }

  function handleEscape() {
    setEditedTitle(title);
    setEditID(null);
  }

  function handleDelete() {
    deleteTodo(id);
    setEditID(null);
  }

  function editing() {
    return editID() === id;
  }

  function autoFocus(el) {
    setTimeout(() => el.focus());
  }

  return (
    <li
      classList={{
        editing: editing(),
        completed: completed,
      }}
    >
      {!editing() ? (
        <>
          <div class="view">
            <input
              class="toggle"
              type="checkbox"
              checked={completed}
              onChange={handleToggle}
            />
            <label onDblClick={handleEdit}>{title()}</label>
            <button class="destroy" onClick={handleDelete}></button>
          </div>
        </>
      ) : (
        <>
          <input
            class="edit"
            value={editedTitle()}
            onBlur={handleBlur}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            ref={autoFocus}
          />
        </>
      )}
    </li>
  );
}

export default TodoItem;
