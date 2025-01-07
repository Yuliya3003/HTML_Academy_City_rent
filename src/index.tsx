
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

setTimeout(() => {
  // yandex metrika 
  var counter = (window as any).yaCounter99437467;

  if (counter && counter.getClientID) {
    counter.getClientID().then((clientID: number) => {
      console.log("Client ID текущего пользователя:", clientID);
    }).catch((error: string) => {
      console.error("Ошибка получения Client ID:", error);
    });
  } else {
    console.error("Счетчик Яндекс Метрики не найден или не загружен.");
  }
}, 5000);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
