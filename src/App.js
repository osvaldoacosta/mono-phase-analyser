import logo from "./logo.svg";
import "./App.css";
import TransformerForm from "./components/TransformerForm";
import MenuBar from "./components/MenuBar";

function App() {
  return (
    <div className="App">
      <MenuBar />
      <TransformerForm />
    </div>
  );
}

export default App;
