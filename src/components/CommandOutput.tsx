
import React from 'react';

interface CommandOutputProps {
  input: string;
  output: React.ReactNode;
}

const CommandOutput: React.FC<CommandOutputProps> = ({ input, output }) => {
  return (
    <div className="mb-4">
      {input && (
        <div className="command-prompt">
          <span className="text-yellow-400">$</span>
          <span className="ml-2">{input}</span>
        </div>
      )}
      <div className="mt-1 pl-5">{output}</div>
    </div>
  );
};

export default CommandOutput;
