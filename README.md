# build-jira-notifier

Creates data for jira automation webhook used to notify after deployment succeeded

## Works with:
* github actions
* codepush
* bitrise

For example, if your project name (defined with `JIRA_PROJECT_NAME` env) is `KIDZDEV` then your jira issues will have slugs, e.g. `KIDZDEV-123`, `KIDZDEV-124`, `KIDZDEV-125`.

In order for `build-jira-notifier` to pick up the jira issues your commit message (both head and/or body) must have a line starting with one of the following:
* `KIDZDEV-123`
* `*KIDZDEV-123`
* `-KIDZDEV-123`
* `* KIDZDEV-123`
* `- KIDZDEV-123` <- this is preferred

You can also add description:
* `- KIDZDEV-123: optimize this`

Or you can add multiple jira issues
* `- KIDZDEV-123, KIDZDEV-124,KIDZDEV-125: optimize all of these`


## How to use

1. Set up env variables including `JIRA_INCOMING_HOOK` and `JIRA_PROJECT_NAME`

2. Run the hook with npx
```bash
curl -X POST -H 'Content-type: application/json' --data "$(npx github:KidzToPros2018/build-jira-notifier)" "$JIRA_INCOMING_HOOK"
```

### Github actions example

```yaml
name: CI

on:
  push:
    branches:
    - 'staging'
    - 'master'

jobs:
  notify-jira:
    name: Notify Jira
    runs-on: ubuntu-latest

    steps:
    - name: Notify Jira
      env:
        GIT_CLONE_COMMIT_MESSAGE: ${{ github.event.head_commit.message }}
        JIRA_INCOMING_HOOK: ${{ secrets.JIRA_INCOMING_HOOK }}
        JIRA_PROJECT_NAME: KIDZDEV
      run: |
        curl -X POST -H 'Content-type: application/json' --data "$(npx github:KidzToPros2018/build-jira-notifier)" "$JIRA_INCOMING_HOOK"
```

