
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Cria a raiz do React e renderiza o app
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = createRoot(rootElement);
root.render(<App />);
