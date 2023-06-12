import { FC, ReactNode } from 'react';

interface ReactMarkdownProps {
  children: ReactNode;
}

const ReactMarkdown: FC<ReactMarkdownProps> = ({ children }) => {
  return <>{children}</>;
};

export default ReactMarkdown;
