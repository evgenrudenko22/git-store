import React from 'react';

function BranchList({ branches, onSelect }) {
  return (
    <div className="branch-list">
      <h2>Branches</h2>
      <ul>
        {branches.map((branch, index) => (
          <li key={index}>
            <a href="#" onClick={() => onSelect(branch.trim())}>
              {branch}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BranchList;
