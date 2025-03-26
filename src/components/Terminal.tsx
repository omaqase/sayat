import React, { useState, useEffect, useRef } from 'react';
import CommandInput from './CommandInput';
import CommandOutput from './CommandOutput';
import { Motion } from './TerminalEffects';

interface Command {
  input: string;
  output: React.ReactNode;
}

const Terminal = () => {
  const [commands, setCommands] = useState<Command[]>([]);
  const [bootSequence, setBootSequence] = useState<boolean>(true);
  const outputRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setBootSequence(false);
      
      setCommands([
        {
          input: '',
          output: (
            <>
              <Motion text="Welcome to Terminal Portfolio v1.0.1" delay={30} />
              <Motion text="Type 'help' to see available commands." delay={30} className="mt-2" />
            </>
          ),
        },
      ]);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [commands]);

  const executeCommand = (input: string) => {
    let output: React.ReactNode;
    const cmd = input.trim().toLowerCase();

    switch (cmd) {
      case 'help':
        output = (
          <>
            <div className="font-bold mb-1">Available commands:</div>
            <div className="grid grid-cols-1 gap-1">
              <div><span className="text-yellow-400">help</span> - Show available commands</div>
              <div><span className="text-yellow-400">info</span> - Display information about me</div>
              <div><span className="text-yellow-400">skills</span> - List my technical skills</div>
              <div><span className="text-yellow-400">projects</span> - View my portfolio projects</div>
              <div><span className="text-yellow-400">contacts</span> - Display contact information</div>
              <div><span className="text-yellow-400">clear</span> - Clear the terminal</div>
            </div>
          </>
        );
        break;
      case 'info':
        output = (
          <>
            <div className="text-yellow-400 font-bold mb-1">About Me:</div>
            <Motion text="I'm a Software Engineer with a passion for creating elegant solutions to complex problems." delay={15} />
            <Motion text="With a strong foundation in software development and a keen eye for detail," delay={15} className="mt-1" />
            <Motion text="I excel at crafting efficient, maintainable code that delivers exceptional user experiences." delay={15} className="mt-1" />
            <Motion text="My approach combines technical expertise with creative problem-solving," delay={15} className="mt-1" />
            <Motion text="enabling me to develop innovative applications that meet and exceed client expectations." delay={15} className="mt-1" />
            <div className="mt-3">
              <Motion text="Type 'skills' to see my technical expertise." delay={15} />
            </div>
          </>
        );
        break;
      case 'skills':
        output = (
          <>
            <div className="text-yellow-400 font-bold mb-1">Technical Skills:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 mt-2">
              <div>
                <div className="text-terminal-green underline">Languages:</div>
                <ul className="list-disc pl-5 mt-1">
                  <li>JavaScript/TypeScript</li>
                  <li>Python</li>
                  <li>Java</li>
                  <li>C#</li>
                  <li>SQL</li>
                </ul>
              </div>
              <div>
                <div className="text-terminal-green underline">Frontend:</div>
                <ul className="list-disc pl-5 mt-1">
                  <li>React.js</li>
                  <li>Vue.js</li>
                  <li>Angular</li>
                  <li>HTML5/CSS3</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>
              <div>
                <div className="text-terminal-green underline">Backend:</div>
                <ul className="list-disc pl-5 mt-1">
                  <li>Node.js</li>
                  <li>Express</li>
                  <li>Django</li>
                  <li>Flask</li>
                  <li>ASP.NET Core</li>
                </ul>
              </div>
              <div>
                <div className="text-terminal-green underline">Tools/Others:</div>
                <ul className="list-disc pl-5 mt-1">
                  <li>Git/GitHub</li>
                  <li>Docker</li>
                  <li>AWS/Azure</li>
                  <li>CI/CD Pipelines</li>
                  <li>Agile/Scrum</li>
                </ul>
              </div>
            </div>
          </>
        );
        break;
      case 'projects':
        output = (
          <>
            <div className="text-yellow-400 font-bold mb-2">Portfolio Projects:</div>
            
            <div className="mb-4">
              <div className="text-terminal-green font-bold">E-Commerce Platform</div>
              <div className="pl-4">
                <Motion text="A full-stack e-commerce solution with payment processing and inventory management." delay={10} />
                <div><span className="text-purple-400">Tech Stack:</span> React, Node.js, MongoDB, Stripe API</div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="text-terminal-green font-bold">Task Management System</div>
              <div className="pl-4">
                <Motion text="A collaborative project management tool with real-time updates and analytics." delay={10} />
                <div><span className="text-purple-400">Tech Stack:</span> Vue.js, Firebase, Chart.js</div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="text-terminal-green font-bold">Healthcare Data Analytics</div>
              <div className="pl-4">
                <Motion text="Big data analytics platform for healthcare providers to optimize patient care." delay={10} />
                <div><span className="text-purple-400">Tech Stack:</span> Python, Django, PostgreSQL, TensorFlow</div>
              </div>
            </div>
          </>
        );
        break;
      case 'contacts':
        output = (
          <>
            <div className="text-yellow-400 font-bold mb-1">Contact Information:</div>
            <div className="mt-2">
              <div><span className="text-terminal-green font-bold">Email:</span> developer@example.com</div>
              <div className="mt-1"><span className="text-terminal-green font-bold">LinkedIn:</span> linkedin.com/in/developer</div>
              <div className="mt-1"><span className="text-terminal-green font-bold">GitHub:</span> github.com/developer</div>
              <div className="mt-1"><span className="text-terminal-green font-bold">Twitter:</span> @developer</div>
              <div className="mt-3 text-terminal-green italic">Feel free to reach out for collaboration opportunities or just to say hello!</div>
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
          {bootSequence ? (
            <BootSequence />
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

const BootSequence = () => {
  return (
    <div className="text-terminal-green">
      <Motion text="TERMINAL OS v3.2.1" delay={50} />
      <Motion text="Copyright (c) 2023 Developer Industries" delay={30} className="mt-1" />
      <Motion text="All rights reserved." delay={30} className="mt-1" />
      <div className="mt-4">
        <Motion text="Initializing system..." delay={20} />
        <Motion text="Loading kernel modules..." delay={20} className="mt-1" />
        <Motion text="Checking file system integrity..." delay={20} className="mt-1" />
        <Motion text="Setting up environment variables..." delay={20} className="mt-1" />
        <Motion text="Establishing secure connection..." delay={20} className="mt-1" />
      </div>
      <div className="mt-4">
        <Motion text="SYSTEM READY" delay={50} className="text-yellow-400 font-bold" />
      </div>
    </div>
  );
};

export default Terminal;
