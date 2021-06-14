const parseJiraIssue = (line, projectName) => {
  const regexp = new RegExp(`^[- *]*((${projectName}-\\d+[:, ]*)+)`);
  
  const [, matchedIssues] = line.match(regexp) || [];
  
  if (!matchedIssues) return [];
  
  const issues = matchedIssues
    .split(/[:, ]+/)
    .filter(Boolean);

  return issues;
};

module.exports = parseJiraIssue;
