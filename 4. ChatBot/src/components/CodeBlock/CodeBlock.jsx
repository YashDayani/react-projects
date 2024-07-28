import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
// import 'prismjs/themes/prism.css'; // Ensure you have this line or import your preferred theme
import './CodeBlock.css';

const CodeBlock = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="code-block">
      <div className="code-header">
        <span className="language">{language}</span>
        <button onClick={copyToClipboard}>
          {copied ? 'Copied!' : 'Copy code'}
        </button>
      </div>
      <pre className={`language-${language}`}>
        <code className={`language-${language}`} dangerouslySetInnerHTML={{ __html: Prism.highlight(code, Prism.languages[language], language) }} />
      </pre>
    </div>
  );
};

export default CodeBlock;
