import React, { useState, useEffect, useCallback } from 'react';
import Prism from 'prismjs';
import '../../context/code.css';
import 'prismjs/plugins/autoloader/prism-autoloader';

import './CodeBlock.css'


Prism.plugins.autoloader.languages_path = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/';

const CodeBlock = ({ language, code }) => {
  const [copied, setCopied] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState(code);

  const highlight = useCallback(() => {
    const grammar = Prism.languages[language] || Prism.languages.plaintext;
    setHighlightedCode(Prism.highlight(code, grammar, language));
  }, [code, language]);

  useEffect(() => {
    Prism.plugins.autoloader.loadLanguages([language], () => {
      setIsLoaded(true);
      highlight();
    }, () => {
      
      setIsLoaded(true);
      highlight();
    });
  }, [language, code, highlight]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <div className="code-block">
        <div className="code-header">
          <span className="language">{language}</span>
          <button className="copy-button" onClick={copyToClipboard}>
            {copied ? 'Copied!' : 'Copy code'}
          </button>
        </div>
        <pre className={`language-${language}`}>
          <code>
            {isLoaded ? (
              <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
            ) : (
              code
            )}
          </code>
        </pre>
      </div>
    </>
  );
};

export default CodeBlock;