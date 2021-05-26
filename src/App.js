import './App.css';

import { ChartCard } from './components/ChartCard';
import chartData from './mock-data.json';

function App() {
  return (
    <div className="App">
      <ChartCard data={chartData} />
    </div>
  );
}

export default App;
