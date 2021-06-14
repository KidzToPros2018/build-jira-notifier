#!/usr/bin/env node

const commitMessageSeparator = '\n\n';

// 1. get data
const {
  GIT_CLONE_COMMIT_MESSAGE = process.env.CI_MESSAGE,
  GIT_CLONE_COMMIT_MESSAGE_SUBJECT: GIT_CLONE_COMMIT_MESSAGE_SUBJECT_ENV,
  GIT_CLONE_COMMIT_MESSAGE_BODY: GIT_CLONE_COMMIT_MESSAGE_BODY_ENV,
} = process.env;

const getCommitSubjectAndBody = () => {
  if (GIT_CLONE_COMMIT_MESSAGE) {
    const [
      GIT_CLONE_COMMIT_MESSAGE_SUBJECT,
      ...GIT_CLONE_COMMIT_MESSAGE_BODY_PARTS
    ] = GIT_CLONE_COMMIT_MESSAGE.split(commitMessageSeparator);
    const GIT_CLONE_COMMIT_MESSAGE_BODY = GIT_CLONE_COMMIT_MESSAGE_BODY_PARTS.join(
      commitMessageSeparator
    );

    return [GIT_CLONE_COMMIT_MESSAGE_SUBJECT, GIT_CLONE_COMMIT_MESSAGE_BODY];
  }

  return [
    GIT_CLONE_COMMIT_MESSAGE_SUBJECT_ENV,
    GIT_CLONE_COMMIT_MESSAGE_BODY_ENV,
  ];
};

const [
  GIT_CLONE_COMMIT_MESSAGE_SUBJECT,
  GIT_CLONE_COMMIT_MESSAGE_BODY,
] = getCommitSubjectAndBody();

// 2. render
const parseJiraIssue = (line) => {
  
};

const commitLines = `${GIT_CLONE_COMMIT_MESSAGE_SUBJECT}${commitMessageSeparator}${GIT_CLONE_COMMIT_MESSAGE_BODY}`.split(commitMessageSeparator);

const issues = commitLines
  .map(parseJiraIssue)
  .filter(Boolean);

const data = {
  issues,
};

process.stdout.write(JSON.stringify(data));
