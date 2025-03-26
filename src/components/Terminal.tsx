
import React, { useState, useEffect, useRef } from 'react';
import CommandInput from './CommandInput';
import CommandOutput from './CommandOutput';
import { Motion } from './TerminalEffects';
import { loadTerminalContent, TerminalContent } from '../utils/contentLoader';

interface Command {
  input: string;
  output: React.ReactNode;
}

const Terminal = () => {
  const [commands, setCommands] = useState<Command[]>([]);
  const [bootSequence, setBootSequence] = useState<boolean>(true);
  const [content, setContent] = useState<TerminalContent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const outputRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const loadContent = async () => {
      const terminalContent = await loadTerminalContent();
      setContent(terminalContent);
      setLoading(false);
    };
    
    loadContent();
  }, []);

  useEffect(() => {
    if (!loading && content) {
      const timer = setTimeout(() => {
        setBootSequence(false);
        
        setCommands([
          {
            input: '',
            output: (
              <>
                <Motion text={content.welcome.welcomeText} delay={30} />
                <Motion text={content.welcome.helpText} delay={30} className="mt-2" />
              </>
            ),
          },
        ]);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [loading, content]);

  useEffect(() => {
    scrollToBottom();
  }, [commands]);

  const executeCommand = (input: string) => {
    if (!content) return;
    
    let output: React.ReactNode;
    const cmd = input.trim().toLowerCase();

    switch (cmd) {
      case 'help':
        output = (
          <>
            <div className="font-bold mb-1">Available commands:</div>
            <div className="grid grid-cols-1 gap-1">
              {content.commands.commands.map((command, index) => (
                <div key={index}>
                  <span className="text-yellow-400">{command.name}</span> - {command.description}
                </div>
              ))}
            </div>
          </>
        );
        break;
      case 'info':
        output = (
          <>
            <div className="text-yellow-400 font-bold mb-1">{content.info.title}</div>
            {content.info.paragraphs.map((paragraph, index) => (
              <Motion key={index} text={paragraph} delay={15} className={index > 0 ? "mt-1" : ""} />
            ))}
            <div className="mt-3">
              <Motion text={content.info.footer} delay={15} />
            </div>
          </>
        );
        break;
      case 'skills':
        output = (
          <>
            <div className="text-yellow-400 font-bold mb-1">{content.skills.title}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 mt-2">
              {content.skills.categories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <div className="text-terminal-green underline">{category.name}</div>
                  <ul className="list-disc pl-5 mt-1">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        );
        break;
      case 'projects':
        output = (
          <>
            <div className="text-yellow-400 font-bold mb-2">{content.projects.title}</div>
            
            {content.projects.projects.map((project, index) => (
              <div key={index} className="mb-4">
                <div className="text-terminal-green font-bold">{project.title}</div>
                <div className="pl-4">
                  <Motion text={project.description} delay={10} />
                  <div><span className="text-purple-400">Tech Stack:</span> {project.techStack}</div>
                </div>
              </div>
            ))}
          </>
        );
        break;
      case 'contacts':
        output = (
          <>
            <div className="text-yellow-400 font-bold mb-1">{content.contacts.title}</div>
            <div className="mt-2">
              {content.contacts.items.map((item, index) => (
                <div key={index} className={index > 0 ? "mt-1" : ""}>
                  <span className="text-terminal-green font-bold">{item.label}:</span> {item.value}
                </div>
              ))}
              <div className="mt-3 text-terminal-green italic">{content.contacts.footer}</div>
            </div>
          </>
        );
        break;
      case 'clear':
        setCommands([]);
        return;
      case '':
        output = <></>;
        break;
      default:
        output = (
          <div className="text-red-500">
            Command not found: {input}. Type 'help' to see available commands.
          </div>
        );
    }

    setCommands([...commands, { input, output }]);
  };

  if (loading) {
    return <div className="text-center p-8">Loading terminal...</div>;
  }

  return (
    <div className="terminal-screen w-full h-full mx-auto">
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-gray-300">developer@terminal-portfolio</div>
      </div>
      
      <div className="relative h-[calc(100%-2.5rem)]">
        <div className="scanline animate-scanline"></div>
        <div className="crt"></div>
        
        <div className="terminal-content animate-screen-flicker h-full" ref={outputRef}>
          {bootSequence && content ? (
            <BootSequence content={content.boot} />
          ) : (
            <>
              {commands.map((command, index) => (
                <CommandOutput key={index} input={command.input} output={command.output} />
              ))}
              <CommandInput onExecute={executeCommand} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

interface BootSequenceProps {
  content: {
    header: string[];
    sequence: string[];
    ready: string;
  };
}

const BootSequence: React.FC<BootSequenceProps> = ({ content }) => {
  return (
    <div className="text-terminal-green">
      {content.header.map((line, index) => (
        <Motion key={`header-${index}`} text={line} delay={50} className={index > 0 ? "mt-1" : ""} />
      ))}
      <div className="mt-4">
        {content.sequence.map((step, index) => (
          <Motion key={`step-${index}`} text={step} delay={20} className={index > 0 ? "mt-1" : ""} />
        ))}
      </div>
      <div className="mt-4">
        <Motion text={content.ready} delay={50} className="text-yellow-400 font-bold" />
      </div>
    </div>
  );
};

export default Terminal;
