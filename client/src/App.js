import Content from "./components/content/Content";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="container">
      <Header />
      <div className="content">
        <div className="empty">1</div>
        <div className="main">
          <Content />
        </div>
        <div className="empty">1</div>
      </div>
    </div>
  );
}

export default App;
