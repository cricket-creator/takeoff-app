import { useRoutes } from './hooks/useRoutes.hook';
import { Header } from './components/header';
import './index.scss';

function App() {
  const routes = useRoutes(false);
  return (
    <>
      <Header />
      <div className="container content">
        {routes}
      </div>
    </>
  );
}

export default App;
