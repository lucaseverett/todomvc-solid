import { createSignal } from "solid-js";

export default function storage(key, initialValue) {
  const [todos, setTodos] = createSignal(getFromStorage());

  function getFromStorage() {
    return JSON.parse(localStorage.getItem(key)) || initialValue;
  }

  function saveToStorage(value) {
    setTodos(value);
    localStorage.setItem(key, JSON.stringify(value));
  }

  return [todos, saveToStorage];
}
