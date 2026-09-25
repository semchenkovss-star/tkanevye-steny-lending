import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const container = document.getElementById("root")!;

// Страницы собраны заранее (scripts/prerender.mjs): в HTML уже есть готовая
// разметка. Её нужно «оживить», а не рисовать заново — иначе посетитель
// увидит моргание, а робот получит пустую страницу.
if (container.hasChildNodes()) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
