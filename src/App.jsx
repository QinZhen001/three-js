
import { useEffect } from 'react';
import RouteContainer from './router/index.jsx';

function App() {

  const onResize = (e) => {
    console.log("resize", e)
  }

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, [])

  return <>
    <RouteContainer></RouteContainer>
  </>
}


export default App
