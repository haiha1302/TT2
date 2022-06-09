import Content from "./components/Content";
import Header from "./components/Header";

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
