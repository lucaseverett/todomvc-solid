import todoStore from "./todoStore";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

function App() {
  const store = todoStore();

  return (
    <>
      <section class="todoapp">
        <Header {...store} />
        {store.totalCount() > 0 && (
          <>
            <Main {...store} />
            <Footer {...store} />
          </>
        )}
      </section>
      <footer class="info">
        <p>Double-click to edit a todo</p>
        <p>
          Created by <a href="https://lucaseverett.dev">Lucas Everett</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </>
  );
}

export default App;
