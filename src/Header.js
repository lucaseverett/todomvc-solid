import { createSignal } from "solid-js";

function Header({ addTodo }) {
  const [title, setTitle] = createSignal("");

  function handleChange(e) {
    setTitle(e.target.value);
  }

  function handleKeyUp(e) {
    if (e.keyCode === 13 && title().trim()) {
      addTodo({ title: title().trim(), completed: false });
      setTitle("");
    }
  }

  return (
    <header class="header">
      <h1>todos</h1>
      <input
        value={title()}
        onInput={handleChange}
        onKeyUp={handleKeyUp}
        class="new-todo"
        placeholder="What needs to be done?"
        autoFocus
      />
    </header>
  );
}

export default Header;
