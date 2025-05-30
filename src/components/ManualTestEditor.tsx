
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Copy, Download } from 'lucide-react';

interface TestCase {
  id: string;
  title: string;
  steps: string[];
  expectedResult: string;
  actualResult?: string;
  status: 'pass' | 'fail' | 'pending';
  priority: 'high' | 'medium' | 'low';
}

interface ManualTestEditorProps {
  onTestCasesChange?: (testCases: TestCase[]) => void;
}

const ManualTestEditor: React.FC<ManualTestEditorProps> = ({ onTestCasesChange }) => {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    // Initialize with one empty test case
    if (testCases.length === 0) {
      addTestCase();
    }
  }, []);

  useEffect(() => {
    // Notify parent component of changes
    if (onTestCasesChange) {
      onTestCasesChange(testCases);
    }
  }, [testCases, onTestCasesChange]);

  const addTestCase = () => {
    const newTestCase: TestCase = {
      id: `tc-${Date.now()}`,
      title: '',
      steps: [''],
      expectedResult: '',
      actualResult: '',
      status: 'pending',
      priority: 'medium'
    };
    
    setTestCases([...testCases, newTestCase]);
    setEditingIndex(testCases.length);
  };

  const updateTestCase = (index: number, field: keyof TestCase, value: any) => {
    const updated = [...testCases];
    updated[index] = { ...updated[index], [field]: value };
    setTestCases(updated);
  };

  const addStep = (testCaseIndex: number) => {
    const updated = [...testCases];
    updated[testCaseIndex].steps.push('');
    setTestCases(updated);
  };

  const updateStep = (testCaseIndex: number, stepIndex: number, value: string) => {
    const updated = [...testCases];
    updated[testCaseIndex].steps[stepIndex] = value;
    setTestCases(updated);
  };

  const removeStep = (testCaseIndex: number, stepIndex: number) => {
    const updated = [...testCases];
    updated[testCaseIndex].steps.splice(stepIndex, 1);
    setTestCases(updated);
  };

  const removeTestCase = (index: number) => {
    const updated = testCases.filter((_, i) => i !== index);
    setTestCases(updated);
    setEditingIndex(null);
  };

  const exportTestCases = () => {
    const dataStr = JSON.stringify(testCases, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'test-cases.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyTestCases = () => {
    const testCasesText = testCases.map(tc => 
      `Test Case: ${tc.title}\n` +
      `Priority: ${tc.priority}\n` +
      `Steps:\n${tc.steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}\n` +
      `Expected Result: ${tc.expectedResult}\n` +
      `Status: ${tc.status}\n\n`
    ).join('');
    
    navigator.clipboard.writeText(testCasesText);
  };

  const getStatusColor = (status: TestCase['status']) => {
    switch (status) {
      case 'pass': return 'bg-green-100 text-green-800';
      case 'fail': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: TestCase['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Manual Test Cases</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={copyTestCases}>
            <Copy className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={exportTestCases}>
            <Download className="w-4 h-4" />
          </Button>
          <Button onClick={addTestCase}>
            <Plus className="w-4 h-4 mr-2" />
            Add Test Case
          </Button>
        </div>
      </div>

      <div className="space-y-4 max-h-[600px] overflow-y-auto">
        {testCases.map((testCase, index) => (
          <Card key={testCase.id} className="border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  Test Case #{index + 1}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge className={getPriorityColor(testCase.priority)}>
                    {testCase.priority}
                  </Badge>
                  <Badge className={getStatusColor(testCase.status)}>
                    {testCase.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTestCase(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Title</label>
                  <Input
                    value={testCase.title}
                    onChange={(e) => updateTestCase(index, 'title', e.target.value)}
                    placeholder="Enter test case title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Priority</label>
                  <Select
                    value={testCase.priority}
                    onValueChange={(value) => updateTestCase(index, 'priority', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Test Steps</label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addStep(index)}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Step
                  </Button>
                </div>
                <div className="space-y-2">
                  {testCase.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex gap-2">
                      <span className="text-sm text-gray-500 mt-2 min-w-[20px]">
                        {stepIndex + 1}.
                      </span>
                      <Input
                        value={step}
                        onChange={(e) => updateStep(index, stepIndex, e.target.value)}
                        placeholder={`Step ${stepIndex + 1}`}
                        className="flex-1"
                      />
                      {testCase.steps.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeStep(index, stepIndex)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Expected Result</label>
                <Textarea
                  value={testCase.expectedResult}
                  onChange={(e) => updateTestCase(index, 'expectedResult', e.target.value)}
                  placeholder="Describe the expected result"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Actual Result (Optional)</label>
                  <Textarea
                    value={testCase.actualResult || ''}
                    onChange={(e) => updateTestCase(index, 'actualResult', e.target.value)}
                    placeholder="Record the actual result after execution"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Status</label>
                  <Select
                    value={testCase.status}
                    onValueChange={(value) => updateTestCase(index, 'status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="pass">Pass</SelectItem>
                      <SelectItem value="fail">Fail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-sm text-gray-500">
        <p>💡 <strong>Tips for effective test cases:</strong></p>
        <ul className="list-disc ml-6 mt-1 space-y-1">
          <li>Write clear, actionable steps that anyone can follow</li>
          <li>Include both positive and negative test scenarios</li>
          <li>Be specific about expected results</li>
          <li>Test edge cases and boundary conditions</li>
          <li>Consider accessibility and usability aspects</li>
        </ul>
      </div>
    </div>
  );
};

export default ManualTestEditor;
