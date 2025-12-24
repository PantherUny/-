import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message, Role } from '../types';
import remarkGfm from 'remark-gfm';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === Role.USER;

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-4 shadow-sm ${
          isUser
            ? 'bg-amazon-blue text-white rounded-br-none'
            : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
        }`}
      >
        <div className="prose prose-sm max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-2 prose-li:my-0.5">
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.text}</p>
          ) : (
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                code(props) {
                  const {children, className, node, ...rest} = props
                  const match = /language-(\w+)/.exec(className || '')
                  return match ? (
                    <div className="relative group rounded-md overflow-hidden my-2">
                       <div className="bg-gray-800 text-gray-200 text-xs px-3 py-1 flex justify-between items-center">
                          <span>{match[1]}</span>
                       </div>
                       <pre {...rest} className={`${className} bg-gray-900 !p-4 !m-0 overflow-x-auto text-sm text-gray-100`}>
                        <code>{children}</code>
                       </pre>
                    </div>
                  ) : (
                    <code {...rest} className={`${className} bg-gray-100 text-amazon-dark px-1 py-0.5 rounded font-mono text-sm`}>
                      {children}
                    </code>
                  )
                },
                table({children}) {
                    return <div className="overflow-x-auto my-4 border rounded-lg"><table className="min-w-full divide-y divide-gray-200">{children}</table></div>
                },
                thead({children}) {
                    return <thead className="bg-gray-50">{children}</thead>
                },
                th({children}) {
                    return <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{children}</th>
                },
                td({children}) {
                    return <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 border-t border-gray-100">{children}</td>
                },
                a({children, href}) {
                    return <a href={href} target="_blank" rel="noopener noreferrer" className="text-amazon-blue hover:underline">{children}</a>
                }
              }}
            >
              {message.text}
            </ReactMarkdown>
          )}
        </div>
        {message.isStreaming && (
            <div className="mt-2 flex gap-1">
                <span className="w-2 h-2 bg-amazon-orange rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-amazon-orange rounded-full animate-bounce delay-75"></span>
                <span className="w-2 h-2 bg-amazon-orange rounded-full animate-bounce delay-150"></span>
            </div>
        )}
      </div>
    </div>
  );
};
