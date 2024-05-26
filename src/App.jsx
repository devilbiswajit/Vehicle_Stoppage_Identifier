import React, { useEffect, useState } from 'react';
import Map from './Map';
import { fetchStoppageData, calculateStoppages } from './stoppageUtils';

const STOPPAGE_THRESHOLD_MINUTES = 10;

function App() {
  const [stoppageData, setStoppageData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchStoppageData();
      console.log("data coming here:",data);
      const stoppages = calculateStoppages(data, STOPPAGE_THRESHOLD_MINUTES);
      // console.log("Stoppages Data before setState:", stoppages); 
      console.log("but here comingonly 3 datas"+stoppages);
      setStoppageData(stoppages);
    };

    loadData();
  }, []);

  return (
    <div>
      <h1 className='bg-green-300 text-xl w-full  '>Vehicle Stoppage Identification and Visualization</h1>
      <Map stoppageData={stoppageData} />
    </div>
  );
}
export default App;





