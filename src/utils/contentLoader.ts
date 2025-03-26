
type WelcomeContent = {
  welcomeText: string;
  helpText: string;
};

type Command = {
  name: string;
  description: string;
};

type CommandsContent = {
  commands: Command[];
};

type InfoContent = {
  title: string;
  paragraphs: string[];
  footer: string;
};

type SkillCategory = {
  name: string;
  items: string[];
};

type SkillsContent = {
  title: string;
  categories: SkillCategory[];
};

type Project = {
  title: string;
  description: string;
  techStack: string;
};

type ProjectsContent = {
  title: string;
  projects: Project[];
};

type ContactItem = {
  label: string;
  value: string;
};

type ContactsContent = {
  title: string;
  items: ContactItem[];
  footer: string;
};

type BootContent = {
  header: string[];
  sequence: string[];
  ready: string;
};

export type TerminalContent = {
  welcome: WelcomeContent;
  commands: CommandsContent;
  info: InfoContent;
  skills: SkillsContent;
  projects: ProjectsContent;
  contacts: ContactsContent;
  boot: BootContent;
};

const extractJsonContent = (markdownContent: string, sectionName: string): any => {
  const sectionRegex = new RegExp(`## ${sectionName}\\s*\`\`\`json\\s*([\\s\\S]*?)\\s*\`\`\``, 'i');
  const match = markdownContent.match(sectionRegex);
  
  if (match && match[1]) {
    try {
      return JSON.parse(match[1]);
    } catch (error) {
      console.error(`Error parsing JSON in ${sectionName} section:`, error);
      return null;
    }
  }
  
  console.error(`Section ${sectionName} not found or invalid format`);
  return null;
};

export const loadTerminalContent = async (): Promise<TerminalContent | null> => {
  try {
    const response = await fetch('/terminal-content.md');
    
    if (!response.ok) {
      throw new Error('Failed to fetch terminal content');
    }
    
    const markdownContent = await response.text();
    
    return {
      welcome: extractJsonContent(markdownContent, 'Welcome'),
      commands: extractJsonContent(markdownContent, 'Commands'),
      info: extractJsonContent(markdownContent, 'Info'),
      skills: extractJsonContent(markdownContent, 'Skills'),
      projects: extractJsonContent(markdownContent, 'Projects'),
      contacts: extractJsonContent(markdownContent, 'Contacts'),
      boot: extractJsonContent(markdownContent, 'Boot')
    };
  } catch (error) {
    console.error('Error loading terminal content:', error);
    return null;
  }
};
