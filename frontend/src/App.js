import Home from "./components/Home";
import "./App.css"
import {UserContextProvider} from "./context/UserContextProvider"
function App() {
  return (
    <UserContextProvider>
      <Home />
    </UserContextProvider>
  );
}

export default App;
