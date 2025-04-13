import React, { useState, useEffect, FC } from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
  typingSpeed?: number;
}


const MarkdownRenderer: FC<MarkdownRendererProps> = ({
  content,
  typingSpeed = 10,
}) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (currentIndex < content.length) {
      const timer = setTimeout(() => {
        setDisplayedContent((prev) => prev + content[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, content, typingSpeed]);
  return <ReactMarkdown>{displayedContent}</ReactMarkdown>;
};

export default MarkdownRenderer;
