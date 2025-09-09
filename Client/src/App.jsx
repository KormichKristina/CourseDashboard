import HomePage from './pages/HomePage'
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import CalculatorPage from './pages/CalculatorPage';
import ProfilePage from './pages/ProfilePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddCurrencyPage from './pages/AddCurrencyPage';

const router=createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path:'/log-in',
    element:<LogInPage></LogInPage>
  },
  {
    path:'/sign-up',
    element:<SignUpPage></SignUpPage>
  },
  {
    path:'/calculate',
    element:<CalculatorPage></CalculatorPage>
  },
  {
    path:'/profile',
    element:<ProfilePage></ProfilePage>
  },
  {
    path:'add-currency',
    element:<AddCurrencyPage></AddCurrencyPage>
  }
]);

function App() {
  
    return (
        <RouterProvider router={router}/>);
      
  
}

export default App
