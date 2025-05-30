
import React, { useState, useEffect } from 'react';
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

interface AutomationSubmission {
  language: string;
  code: string;
  framework: string;
}

interface AutomationCodeEditorProps {
  onCodeChange?: (code: AutomationSubmission) => void;
}

const AutomationCodeEditor: React.FC<AutomationCodeEditorProps> = ({ onCodeChange }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('java');
  const [code, setCode] = useState('');

  const languages: Language[] = [
    {
      id: 'java',
      name: 'Java (Selenium)',
      extension: 'java',
      template: `import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.AfterEach;

public class ChallengeTest {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeEach
    public void setUp() {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @Test
    public void testChallenge() {
        // Navigate to the application
        driver.get("APPLICATION_URL");
        
        // TODO: Implement your test logic here
        // Example: WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("element-id")));
        
        // Add assertions to verify expected outcomes
        // Example: Assert.assertEquals("Expected Text", element.getText());
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}`
    },
    {
      id: 'python',
      name: 'Python (Selenium)',
      extension: 'py',
      template: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
import pytest
import time

class TestChallenge:
    def setup_method(self):
        # Initialize WebDriver
        self.driver = webdriver.Chrome()
        self.wait = WebDriverWait(self.driver, 10)
    
    def teardown_method(self):
        # Clean up
        if self.driver:
            self.driver.quit()
    
    def test_challenge(self):
        # Navigate to the application
        self.driver.get("APPLICATION_URL")
        
        # TODO: Implement your test logic here
        # Example: element = self.wait.until(EC.visibility_of_element_located((By.ID, "element-id")))
        
        # Add assertions to verify expected outcomes
        # Example: assert element.text == "Expected Text"
        
        pass

if __name__ == "__main__":
    pytest.main([__file__])`
    },
    {
      id: 'javascript',
      name: 'JavaScript (WebDriverIO)',
      extension: 'js',
      template: `const { remote } = require('webdriverio');

describe('Challenge Test Suite', () => {
    let browser;

    before(async () => {
        browser = await remote({
            capabilities: {
                browserName: 'chrome'
            }
        });
    });

    after(async () => {
        if (browser) {
            await browser.deleteSession();
        }
    });

    it('should complete the challenge', async () => {
        // Navigate to the application
        await browser.url('APPLICATION_URL');
        
        // TODO: Implement your test logic here
        // Example: const element = await browser.$('#element-id');
        // Example: await element.waitForDisplayed();
        
        // Add assertions to verify expected outcomes
        // Example: expect(await element.getText()).toBe('Expected Text');
    });
});`
    },
    {
      id: 'csharp',
      name: 'C# (Selenium)',
      extension: 'cs',
      template: `using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using NUnit.Framework;
using System;

[TestFixture]
public class ChallengeTest
{
    private IWebDriver driver;
    private WebDriverWait wait;

    [SetUp]
    public void SetUp()
    {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
    }

    [TearDown]
    public void TearDown()
    {
        driver?.Quit();
    }

    [Test]
    public void TestChallenge()
    {
        // Navigate to the application
        driver.Navigate().GoToUrl("APPLICATION_URL");
        
        // TODO: Implement your test logic here
        // Example: IWebElement element = wait.Until(ExpectedConditions.ElementIsVisible(By.Id("element-id")));
        
        // Add assertions to verify expected outcomes
        // Example: Assert.AreEqual("Expected Text", element.Text);
    }
}`
    }
  ];

  const handleLanguageChange = (languageId: string) => {
    const language = languages.find(lang => lang.id === languageId);
    if (language) {
      setSelectedLanguage(languageId);
      if (!code.trim() || code === languages.find(lang => lang.id === selectedLanguage)?.template) {
        setCode(language.template);
      }
    }
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    
    // Notify parent component
    if (onCodeChange) {
      const language = languages.find(lang => lang.id === selectedLanguage);
      onCodeChange({
        language: selectedLanguage,
        code: newCode,
        framework: language?.name || 'Unknown'
      });
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

  useEffect(() => {
    // Initialize with Java template
    const javaLanguage = languages.find(lang => lang.id === 'java');
    if (javaLanguage && !code.trim()) {
      setCode(javaLanguage.template);
    }
  }, []);

  useEffect(() => {
    // Notify parent when code changes
    if (code.trim()) {
      const language = languages.find(lang => lang.id === selectedLanguage);
      if (onCodeChange) {
        onCodeChange({
          language: selectedLanguage,
          code: code,
          framework: language?.name || 'Unknown'
        });
      }
    }
  }, [code, selectedLanguage, onCodeChange]);

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
            Validate Code
          </Button>
        </div>
        <Textarea
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          className="min-h-[500px] border-0 rounded-none font-mono text-sm resize-none"
          placeholder="Write your automation code here..."
        />
      </div>
      
      <div className="text-sm text-gray-500">
        <p>💡 <strong>Tips for quality automation code:</strong></p>
        <ul className="list-disc ml-6 mt-1 space-y-1">
          <li>Use explicit waits instead of implicit waits or Thread.sleep()</li>
          <li>Implement the Page Object Model pattern for maintainability</li>
          <li>Write clear assertions to verify expected outcomes</li>
          <li>Handle exceptions gracefully and ensure proper cleanup</li>
          <li>Use meaningful variable names and add comments for complex logic</li>
          <li>Follow your framework's best practices and conventions</li>
        </ul>
      </div>
    </div>
  );
};

export default AutomationCodeEditor;
