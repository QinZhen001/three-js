
import { useEffect } from 'react';

function App() {



  return <>
    {isMobile() ? <MobileEntry></MobileEntry> : <PCEntry></PCEntry>}
  </>



}


export default App
