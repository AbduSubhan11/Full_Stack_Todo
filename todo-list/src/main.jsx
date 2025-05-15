import { createRoot } from 'react-dom/client';
import TodoApp from './App.jsx';
import './index.css';
import { store } from './Store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <TodoApp />
    </BrowserRouter>
  </Provider>
);
