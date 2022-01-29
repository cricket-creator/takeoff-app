import { useRoutes } from './hooks/useRoutes.hook';

function App() {
  const routes = useRoutes(true);
  return (
    <div>
      {routes}
    </div>
  );
}

export default App;
