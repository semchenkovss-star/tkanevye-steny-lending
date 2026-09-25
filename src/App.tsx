import { BrowserRouter } from "react-router-dom";
import AppRoutes from "@/AppRoutes";

/** Приложение в браузере: адрес страницы берётся из строки браузера */
const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
