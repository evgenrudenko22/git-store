import React, { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import Sidebar from './components/Sidebar';
import BranchList from './components/BranchList';
import './App.css'

function App() {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [commits, setCommits] = useState([]);
  const [newBranchName, setNewBranchName] = useState('');

  // Завантажуємо гілки при завантаженні компонента
  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const branches = await invoke('list_branches');
      setBranches(branches.split('\n').filter(branch => branch));
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  const fetchCommits = async (branch) => {
    try {
      const commits = await invoke('list_commits', { branch });
      setCommits(commits.split('\n').filter(commit => commit));
      setSelectedBranch(branch);
    } catch (error) {
      console.error('Error fetching commits:', error);
    }
  };

  const createNewBranch = async () => {
    try {
      await invoke('create_branch', { name: newBranchName });
      setNewBranchName('');
      fetchBranches(); // Оновлення списку гілок
    } catch (error) {
      console.error('Error creating branch:', error);
    }
  };

  const handleBranchSelect = (branchName) => {
    fetchCommits(branchName);
  };

  return (
    <div id="app">
      <Sidebar />
      <div className="content">
        <header>
          <h1>Git Branches</h1>
          <input
            type="text"
            placeholder="New Branch Name"
            value={newBranchName}
            onChange={(e) => setNewBranchName(e.target.value)}
          />
          <button onClick={createNewBranch}>Create New Branch</button>
        </header>
        <BranchList branches={branches} onSelect={handleBranchSelect} />
        {selectedBranch && (
          <div>
            <h2>Commits for {selectedBranch}</h2>
            <ul>
              {commits.map((commit, index) => (
                <li key={index}>{commit}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
