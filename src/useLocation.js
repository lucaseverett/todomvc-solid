import { createSignal, onCleanup } from "solid-js";

function getHash() {
  return location.hash.slice(2) || "all";
}

export default function useLocation() {
  const [hash, setHash] = createSignal(getHash());

  function hashChanged() {
    setHash(getHash());
  }

  window.addEventListener("hashchange", hashChanged);

  onCleanup(() => window.removeEventListener("hashchange", hashChanged));

  return hash;
}
