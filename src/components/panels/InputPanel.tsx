import React from "react";

interface InputPanelProps {
  mode: string;
}

const InputPanel: React.FC<InputPanelProps> = ({ mode }) => {
  return (
    <div>
      {/* You can use mode here for conditional rendering */}
      <h2 className="text-lg font-semibold mb-2">Input Panel - {mode}</h2>
      {/* Your rest of input logic (voice, text, camera, etc.) */}
    </div>
  );
};

export default InputPanel;
