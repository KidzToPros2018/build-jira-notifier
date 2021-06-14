const parseJiraIssue = require('./parseJiraIssue');

// [input: string, output: string[]]
const cases = [
  // with output
  [
    'KIDZDEV-123',
    ['KIDZDEV-123'],
  ],
  [
    '*KIDZDEV-123',
    ['KIDZDEV-123'],
  ],
  [
    '-KIDZDEV-123',
    ['KIDZDEV-123'],
  ],
  [
    '* KIDZDEV-123',
    ['KIDZDEV-123'],
  ],
  [
    '- KIDZDEV-123',
    ['KIDZDEV-123'],
  ],
  [
    '- KIDZDEV-123: optimize this',
    ['KIDZDEV-123'],
  ],
  [
    '- KIDZDEV-123, KIDZDEV-124,KIDZDEV-125: optimize all of these',
    ['KIDZDEV-123', 'KIDZDEV-124', 'KIDZDEV-125'],
  ],

  // without output
  [
    'This jira issue is in the middle of the text KIDZDEV-123',
    [],
  ],
  [
    'KIDZDEV2-123: This jira issue is of another project',
    [],
  ],
];

cases.forEach(([input, expectedOutputs]) => {
  const outputs = parseJiraIssue(input, 'KIDZDEV');

  if (JSON.stringify(outputs) !== JSON.stringify(expectedOutputs)) {
    console.error({
      input, expectedOutputs, outputs,
    });
    throw new Error(`Assertion failed for input: ${input}`);
  };
});
