import React from "react";

const BranchList = ({ onSelect }) => {
    const branches = ["main", "prerelease", "debug"]

    return (
        <div id="branch_list">
            <ul>
                {branches.map((branch) => (
                    <li key={branch}>
                        <a href="#" onclick={() => onSelect(branch)}>
                            {branch}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default BranchList