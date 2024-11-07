import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
// import Home from "./Pages/Home";
import Simulador from "./Pages/Simulacion";

function App() {
  const rutas = [
    { url: "/", elemento:<Simulador /> },
    { url: "Simulador", elemento: <Simulador /> },
  ];
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {rutas.map((ruta, index) => (
            <Route path={ruta.url} element={ruta.elemento} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
