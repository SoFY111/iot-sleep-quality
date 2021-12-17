import './App.css';

import TopContent from "./components/TopContent";
import MidContent from "./components/MidContent";



function App() {
    return (
        <div className="container lg:min-w-full flex-col align-center justify-center">
            <TopContent />
            <MidContent />
        </div>

    );
}

export default App;
