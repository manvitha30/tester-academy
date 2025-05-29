
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from 'lucide-react';

interface TestCase {
  id: string;
  testCaseId: string;
  title: string;
  module: string;
  preconditions: string;
  testSteps: string;
  testData: string;
  expectedResult: string;
  actualResult: string;
  status: 'Pass' | 'Fail' | 'Not Executed';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  executedBy: string;
  executionDate: string;
  comments: string;
}

const ManualTestEditor = () => {
  const [testCases, setTestCases] = useState<TestCase[]>([
    {
      id: '1',
      testCaseId: 'TC_UI_001',
      title: 'Verify login with valid credentials',
      module: 'Login',
      preconditions: 'User has valid account credentials',
      testSteps: '1. Navigate to login page\n2. Enter valid username\n3. Enter valid password\n4. Click login button',
      testData: 'Username: testuser@example.com\nPassword: Password123!',
      expectedResult: 'User is successfully logged in and redirected to dashboard',
      actualResult: '',
      status: 'Not Executed',
      severity: 'High',
      executedBy: '',
      executionDate: '',
      comments: ''
    }
  ]);

  const addTestCase = () => {
    const newTestCase: TestCase = {
      id: Date.now().toString(),
      testCaseId: `TC_UI_${String(testCases.length + 1).padStart(3, '0')}`,
      title: '',
      module: '',
      preconditions: '',
      testSteps: '',
      testData: '',
      expectedResult: '',
      actualResult: '',
      status: 'Not Executed',
      severity: 'Medium',
      executedBy: '',
      executionDate: '',
      comments: ''
    };
    setTestCases([...testCases, newTestCase]);
  };

  const removeTestCase = (id: string) => {
    setTestCases(testCases.filter(tc => tc.id !== id));
  };

  const updateTestCase = (id: string, field: keyof TestCase, value: string) => {
    setTestCases(testCases.map(tc => 
      tc.id === id ? { ...tc, [field]: value } : tc
    ));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center py-2 mb-4">
        <h3 className="text-lg font-semibold">Manual Test Cases</h3>
        <Button onClick={addTestCase} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Test Case
        </Button>
      </div>
      
      <div className="flex-1 border rounded-lg overflow-hidden">
        <div className="h-full overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow>
                <TableHead className="min-w-[120px]">Test Case ID</TableHead>
                <TableHead className="min-w-[200px]">Title</TableHead>
                <TableHead className="min-w-[120px]">Module</TableHead>
                <TableHead className="min-w-[200px]">Preconditions</TableHead>
                <TableHead className="min-w-[300px]">Test Steps</TableHead>
                <TableHead className="min-w-[200px]">Test Data</TableHead>
                <TableHead className="min-w-[250px]">Expected Result</TableHead>
                <TableHead className="min-w-[250px]">Actual Result</TableHead>
                <TableHead className="min-w-[120px]">Status</TableHead>
                <TableHead className="min-w-[100px]">Severity</TableHead>
                <TableHead className="min-w-[150px]">Executed By</TableHead>
                <TableHead className="min-w-[140px]">Execution Date</TableHead>
                <TableHead className="min-w-[200px]">Comments</TableHead>
                <TableHead className="min-w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testCases.map((testCase) => (
                <TableRow key={testCase.id}>
                  <TableCell>
                    <Input
                      value={testCase.testCaseId}
                      onChange={(e) => updateTestCase(testCase.id, 'testCaseId', e.target.value)}
                      className="min-w-[110px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Textarea
                      value={testCase.title}
                      onChange={(e) => updateTestCase(testCase.id, 'title', e.target.value)}
                      placeholder="Test case title"
                      className="min-w-[180px] min-h-[80px] resize-none"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={testCase.module}
                      onChange={(e) => updateTestCase(testCase.id, 'module', e.target.value)}
                      placeholder="Feature/Module"
                      className="min-w-[110px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Textarea
                      value={testCase.preconditions}
                      onChange={(e) => updateTestCase(testCase.id, 'preconditions', e.target.value)}
                      placeholder="Preconditions"
                      className="min-w-[180px] min-h-[80px] resize-none"
                    />
                  </TableCell>
                  <TableCell>
                    <Textarea
                      value={testCase.testSteps}
                      onChange={(e) => updateTestCase(testCase.id, 'testSteps', e.target.value)}
                      placeholder="Test steps"
                      className="min-w-[280px] min-h-[100px] resize-none"
                    />
                  </TableCell>
                  <TableCell>
                    <Textarea
                      value={testCase.testData}
                      onChange={(e) => updateTestCase(testCase.id, 'testData', e.target.value)}
                      placeholder="Test data"
                      className="min-w-[180px] min-h-[80px] resize-none"
                    />
                  </TableCell>
                  <TableCell>
                    <Textarea
                      value={testCase.expectedResult}
                      onChange={(e) => updateTestCase(testCase.id, 'expectedResult', e.target.value)}
                      placeholder="Expected result"
                      className="min-w-[230px] min-h-[80px] resize-none"
                    />
                  </TableCell>
                  <TableCell>
                    <Textarea
                      value={testCase.actualResult}
                      onChange={(e) => updateTestCase(testCase.id, 'actualResult', e.target.value)}
                      placeholder="Actual result"
                      className="min-w-[230px] min-h-[80px] resize-none"
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={testCase.status}
                      onValueChange={(value) => updateTestCase(testCase.id, 'status', value)}
                    >
                      <SelectTrigger className="min-w-[110px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Not Executed">Not Executed</SelectItem>
                        <SelectItem value="Pass">Pass</SelectItem>
                        <SelectItem value="Fail">Fail</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={testCase.severity}
                      onValueChange={(value) => updateTestCase(testCase.id, 'severity', value)}
                    >
                      <SelectTrigger className="min-w-[90px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      value={testCase.executedBy}
                      onChange={(e) => updateTestCase(testCase.id, 'executedBy', e.target.value)}
                      placeholder="Tester name"
                      className="min-w-[130px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="date"
                      value={testCase.executionDate}
                      onChange={(e) => updateTestCase(testCase.id, 'executionDate', e.target.value)}
                      className="min-w-[130px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Textarea
                      value={testCase.comments}
                      onChange={(e) => updateTestCase(testCase.id, 'comments', e.target.value)}
                      placeholder="Comments/Notes"
                      className="min-w-[180px] min-h-[80px] resize-none"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTestCase(testCase.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ManualTestEditor;
