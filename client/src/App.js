import { useRoutes } from './hooks/useRoutes.hook';
import { Header } from './components/header';
import './index.scss';

function App() {
  const routes = useRoutes(true);
  return (
    <>
      <Header />
      <div className="container">
        {routes}
      </div>
    </>
  );
}

export default App;
