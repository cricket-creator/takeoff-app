import { AuthContext } from './context/AuthContext';
import { useRoutes } from './hooks/useRoutes.hook';
import { useAuth } from './hooks/useAuth.hook';
import { Header } from './components/header';
import './index.scss';

function App() {
  const { token, userId, login, logout, userName } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  return (
    <>
      <AuthContext.Provider value={{
        token, userId, userName, login, logout, isAuthenticated
      }}>
        <Header />
        <div className="container content">
          {routes}
        </div>
      </AuthContext.Provider>
    </>
  );
}

export default App;
