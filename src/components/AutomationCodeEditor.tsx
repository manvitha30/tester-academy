
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Play, Copy, Download } from 'lucide-react';

interface Language {
  id: string;
  name: string;
  template: string;
  extension: string;
}

const AutomationCodeEditor = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('java');
  const [code, setCode] = useState('');

  const languages: Language[] = [
    {
      id: 'java',
      name: 'Java (Selenium)',
      extension: 'java',
      template: `// Write your Java Selenium test code here
// Example: WebDriver driver = new ChromeDriver();`
    },
    {
      id: 'python',
      name: 'Python (Selenium)',
      extension: 'py',
      template: `# Write your Python Selenium test code here
# Example: driver = webdriver.Chrome()`
    },
    {
      id: 'javascript',
      name: 'JavaScript (WebDriverIO)',
      extension: 'js',
      template: `// Write your JavaScript WebDriverIO test code here
// Example: await browser.url('https://example.com')`
    },
    {
      id: 'csharp',
      name: 'C# (Selenium)',
      extension: 'cs',
      template: `// Write your C# Selenium test code here
// Example: IWebDriver driver = new ChromeDriver();`
    }
  ];

  const handleLanguageChange = (languageId: string) => {
    const language = languages.find(lang => lang.id === languageId);
    if (language) {
      setSelectedLanguage(languageId);
      if (!code.trim()) {
        setCode(language.template);
      }
    }
  };

  const handleRunCode = () => {
    console.log('Running code:', selectedLanguage, code);
    // This would integrate with a code execution service
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const handleDownloadCode = () => {
    const language = languages.find(lang => lang.id === selectedLanguage);
    const filename = `test_automation.${language?.extension || 'txt'}`;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  React.useEffect(() => {
    // Initialize with Java template
    const javaLanguage = languages.find(lang => lang.id === 'java');
    if (javaLanguage && !code.trim()) {
      setCode(javaLanguage.template);
    }
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Automation Code Editor</h3>
        <div className="flex items-center gap-2">
          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.id} value={language.id}>
                  {language.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={handleCopyCode}>
            <Copy className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadCode}>
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 border-b flex items-center justify-between">
          <span className="text-sm text-gray-600 font-medium">
            {languages.find(lang => lang.id === selectedLanguage)?.name}
          </span>
          <Button size="sm" onClick={handleRunCode} className="bg-green-600 hover:bg-green-700">
            <Play className="w-4 h-4 mr-2" />
            Run Code
          </Button>
        </div>
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="min-h-[500px] border-0 rounded-none font-mono text-sm resize-none"
          placeholder="Write your automation code here..."
        />
      </div>
      
      <div className="text-sm text-gray-500">
        <p>💡 <strong>Tips:</strong></p>
        <ul className="list-disc ml-6 mt-1 space-y-1">
          <li>Use explicit waits instead of implicit waits or Thread.sleep()</li>
          <li>Write clear assertions to verify expected outcomes</li>
          <li>Handle exceptions gracefully and ensure proper cleanup</li>
          <li>Use meaningful variable names and add comments for complex logic</li>
        </ul>
      </div>
    </div>
  );
};

export default AutomationCodeEditor;
