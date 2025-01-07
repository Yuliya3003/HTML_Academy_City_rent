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

import { useState } from 'react';

function stringToIntHash(str: string): number {
  let hash = 0;
  const prime = 31; // A small prime number for better distribution

  for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i); // Get the ASCII/Unicode value of the character
      hash = (hash * prime + charCode) | 0; // Use bitwise OR to ensure a 32-bit integer
  }

  return hash;
}

function App(): JSX.Element {
  const [usePopup, setUsePopup] = useState(false);
  const [useYuliyaHypotesis, setYuliyaHypotesis] = useState(false);

  // unused variable
  console.log(useYuliyaHypotesis);

  useAppInit();
  useEffect(() => {
    // need to wait fo yandex metrika loading
    setTimeout(() => {
      // yandex metrika 
      var counter = (window as any).yaCounter99437467;
    
      if (counter && counter.getClientID) {
        const id: string = counter.getClientID();
        const hash = stringToIntHash(id);

        // ensure that it is even chance
        //      33% - no change 
        //      33% - popups 
        //      33% - Yuliya 
        const usePopupDialogs = true; 
          // hash % 3 === 1;
        const useYuliyaHypotesis = false; 
           // hash % 3 === 2;

        // hash is unused variable
        console.log('yandex metrika has been found ', hash);
        console.log('prototype: ', usePopupDialogs ? 'popups' : (useYuliyaHypotesis ? 'yuliya' : 'common'));

        setUsePopup(usePopupDialogs);
        setYuliyaHypotesis(useYuliyaHypotesis);
      } else {
        console.error("Счетчик Яндекс Метрики не найден или не загружен.");
      }
    }, 5000);    
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP_ROUTES.MAIN} element={<MainPage usePopup={usePopup} />} />
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
