
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
      template: `import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.junit.Test;
import static org.junit.Assert.*;

public class LoginTest {
    
    @Test
    public void testValidLogin() {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, 10);
        
        try {
            // Navigate to login page
            driver.get("https://demo-shop.example.com/login");
            
            // Find and fill username field
            WebElement usernameField = wait.until(
                ExpectedConditions.presenceOfElementLocated(By.id("username"))
            );
            usernameField.sendKeys("testuser@example.com");
            
            // Find and fill password field
            WebElement passwordField = driver.findElement(By.id("password"));
            passwordField.sendKeys("Password123!");
            
            // Click login button
            WebElement loginButton = driver.findElement(By.id("login-btn"));
            loginButton.click();
            
            // Verify successful login
            WebElement dashboard = wait.until(
                ExpectedConditions.presenceOfElementLocated(By.className("dashboard"))
            );
            assertTrue("Dashboard should be visible after login", dashboard.isDisplayed());
            
        } finally {
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
import unittest

class LoginTest(unittest.TestCase):
    
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.wait = WebDriverWait(self.driver, 10)
    
    def test_valid_login(self):
        driver = self.driver
        wait = self.wait
        
        # Navigate to login page
        driver.get("https://demo-shop.example.com/login")
        
        # Find and fill username field
        username_field = wait.until(
            EC.presence_of_element_located((By.ID, "username"))
        )
        username_field.send_keys("testuser@example.com")
        
        # Find and fill password field
        password_field = driver.find_element(By.ID, "password")
        password_field.send_keys("Password123!")
        
        # Click login button
        login_button = driver.find_element(By.ID, "login-btn")
        login_button.click()
        
        # Verify successful login
        dashboard = wait.until(
            EC.presence_of_element_located((By.CLASS_NAME, "dashboard"))
        )
        self.assertTrue(dashboard.is_displayed(), "Dashboard should be visible after login")
    
    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()`
    },
    {
      id: 'javascript',
      name: 'JavaScript (WebDriverIO)',
      extension: 'js',
      template: `const { expect } = require('@wdio/globals')

describe('Login Test', () => {
    it('should login with valid credentials', async () => {
        // Navigate to login page
        await browser.url('https://demo-shop.example.com/login')
        
        // Find and fill username field
        const usernameField = await $('#username')
        await usernameField.waitForDisplayed()
        await usernameField.setValue('testuser@example.com')
        
        // Find and fill password field
        const passwordField = await $('#password')
        await passwordField.setValue('Password123!')
        
        // Click login button
        const loginButton = await $('#login-btn')
        await loginButton.click()
        
        // Verify successful login
        const dashboard = await $('.dashboard')
        await dashboard.waitForDisplayed()
        expect(dashboard).toBeDisplayed()
    })
})`
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
public class LoginTest
{
    private IWebDriver driver;
    private WebDriverWait wait;
    
    [SetUp]
    public void Setup()
    {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
    }
    
    [Test]
    public void TestValidLogin()
    {
        // Navigate to login page
        driver.Navigate().GoToUrl("https://demo-shop.example.com/login");
        
        // Find and fill username field
        IWebElement usernameField = wait.Until(SeleniumExtras.WaitHelpers.ExpectedConditions
            .ElementIsVisible(By.Id("username")));
        usernameField.SendKeys("testuser@example.com");
        
        // Find and fill password field
        IWebElement passwordField = driver.FindElement(By.Id("password"));
        passwordField.SendKeys("Password123!");
        
        // Click login button
        IWebElement loginButton = driver.FindElement(By.Id("login-btn"));
        loginButton.Click();
        
        // Verify successful login
        IWebElement dashboard = wait.Until(SeleniumExtras.WaitHelpers.ExpectedConditions
            .ElementIsVisible(By.ClassName("dashboard")));
        Assert.IsTrue(dashboard.Displayed, "Dashboard should be visible after login");
    }
    
    [TearDown]
    public void TearDown()
    {
        driver?.Quit();
    }
}`
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
