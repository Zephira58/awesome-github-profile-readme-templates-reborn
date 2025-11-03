import React, { useState } from 'react';

// Get all markdown files from the templates folder
const templateLoaders = import.meta.glob<string>('../templates/*.md', { as: 'raw' });

// Helper to get a clean display name
const getDisplayName = (path: string) => {
    return path.split('/').pop() || path;
};

// Get and sort all file paths once
const sortedFilePaths = Object.keys(templateLoaders).sort();

// Props definition
interface SidebarProps {
    onFileSelect: (filePath: string) => void;
    onShowWelcome: () => void; // Function to show welcome screen
}

const Sidebar: React.FC<SidebarProps> = ({ onFileSelect, onShowWelcome }) => {

    // --- Feature 4: State for search term ---
    const [searchTerm, setSearchTerm] = useState('');

    // --- Feature 3: Handle Random Button Click ---
    const handleRandomClick = () => {
        const randomIndex = Math.floor(Math.random() * sortedFilePaths.length);
        const randomPath = sortedFilePaths[randomIndex];
        onFileSelect(randomPath);
    };

    // --- Feature 4: Filter files based on search term ---
    const filteredFilePaths = sortedFilePaths.filter(path =>
        getDisplayName(path).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <nav>
            {/* --- Feature 3: Random Button --- */}
            <button onClick={handleRandomClick} className="sidebar-random-button">
                🎲 Random Template
            </button>

            {/* --- Feature 4: Search Input --- */}
            <div className="sidebar-search">
                <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* --- Feature 2: Clickable Title --- */}
            <h3>
                <button onClick={onShowWelcome} className="sidebar-title-button">
                    Templates
                </button>
            </h3>

            <ul>
                {/* Map over the FILTERED list */}
                {filteredFilePaths.map((filePath) => (
                    <li key={filePath}>
                        <button onClick={() => onFileSelect(filePath)}>
                            {getDisplayName(filePath)}
                        </button>
                    </li>
                ))}

                {/* Show message if no results */}
                {filteredFilePaths.length === 0 && (
                    <li className="sidebar-no-results">No results found.</li>
                )}
            </ul>
        </nav>
    );
};

export default Sidebar;