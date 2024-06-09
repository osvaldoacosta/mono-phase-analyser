import RoutesApp from "./routes";
import "./App.css";
import MenuBar from "./components/MenuBar";

function App() {
  return (
    <div className="App">
      <MenuBar/>
      <RoutesApp/>
    </div>
  );
}

export default App;
