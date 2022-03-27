function Footer({ clearCompleted, activeCount, completedCount, hash }) {
  function isActive(category) {
    return hash() === category;
  }

  return (
    <footer class="footer">
      <span class="todo-count">
        <strong>{activeCount()}</strong>{" "}
        {activeCount() !== 1 ? "items" : "item"} left
      </span>
      <ul class="filters">
        <li>
          <a href="#/" classList={{ selected: isActive("all") }}>
            All
          </a>
        </li>
        <li>
          <a href="#/active" classList={{ selected: isActive("active") }}>
            Active
          </a>
        </li>
        <li>
          <a href="#/completed" classList={{ selected: isActive("completed") }}>
            Completed
          </a>
        </li>
      </ul>
      {completedCount() > 0 && (
        <button class="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
}

export default Footer;
