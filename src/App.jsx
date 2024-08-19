import React, {useState} from "react";
import Sidebar from "./components/Sidebar.jsx"
import BranchList from "./components/BranchList.jsx"
import "./App.css";

function App() {
  const [selectedBranch, setSelectedBranch] = useState(null);

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch)
  }

  return (
      <div id="app">
        <Sidebar/>
          <div className="content">
            <header>
                <h1>Git Branches</h1>
                <button>Create New Branches</button>
            </header>
            <BranchList onSelect={handleBranchSelect}/>
            {selectedBranch && (
              <div>
                <h2>Commits for {selectedBranch}</h2>
              </div>
            )}
          </div>
      </div>
  )
}

export default App;
