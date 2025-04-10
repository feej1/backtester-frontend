import logo from './logo.svg';
import React from 'react';
import backTestData from '../src/components/chart/backTestSample'
import StockChart from '../src/components/chart/chart'
import Homepage from './components/home/Homepage'
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Contact from './components/Contact/Contact';
import ToolGuide from './components/Guide/Guide';
import { Link, Route, Routes } from "react-router-dom";
import Tool2 from './components/Tool/ToolSettings';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Tool" element={<Tool2 />} />
        <Route path="/Contact" element={(<Contact/>)} />
        {/* <Route path="/Guide" element={(<ToolGuide/>)} /> */}
      </Routes>
    </div>
  );
}








// function App() {
//   return (
//     <div className="App">
//       <StockChart data={backTestData} isLoading={false} seriesName="MSFT" />
//     </div>
//   );
// }





export default App;





