import React from "react";


interface MultiReadingPassageProps {
    title?: string;
    content: string;
}

const MultiReadingPassage: React.FC<MultiReadingPassageProps> = ({title, content}) => {
    return (
        <div id="multi-reading-passage">
            <h1 id="reading-par-title" className="text-lg font-semibold mt-2 mb-1">
                {title}
            </h1>
            <p className="text-sm mb-4">
                 {content}
            </p>
        </div>
    );
}

export default MultiReadingPassage;
