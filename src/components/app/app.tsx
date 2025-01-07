import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import Error404 from '../../pages/Error404/Error404';
import useAppInit from '../../utils/use-init-app/use-init-app';
import { APP_ROUTES } from '../../services/constants';
import { useEffect } from 'react';

function App(): JSX.Element {
  useAppInit();
  useEffect(() => {
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
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP_ROUTES.MAIN} element={<MainPage />} />
        <Route path={APP_ROUTES.LOGIN} element={<LoginPage />} />
        <Route
          path={APP_ROUTES.FAVORITES}
          element={<PrivateRoute element={<FavoritesPage />} />}
        />
        <Route path={APP_ROUTES.OFFER(':id')} element={<OfferPage />} />
        <Route path="/*" element={<Error404 description="Error" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
