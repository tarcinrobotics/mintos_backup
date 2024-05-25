import React, { useState } from 'react';
import axios from 'axios';
import './jDoodleCompiler.css';

function JDoodleCompiler({ code }) {
  const [output, setOutput] = useState('');

  const executeCode = async () => {
    try {
      const response = await axios.post('http://localhost:2000/execute-python', { script: code });
      setOutput(response.data.output);
    } catch (error) {
      console.error('Error executing code:', error);
    }
  };

  return (
    <div className="jdoodle-container">
      <button className="execute-button" onClick={executeCode}>Run Code</button>
      <pre className="output">{output}</pre>
    </div>
  );
}

export default JDoodleCompiler;
