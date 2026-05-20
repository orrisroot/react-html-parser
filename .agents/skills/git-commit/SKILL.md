---
description: Analyze repository changes, gather contextual intent from the current codebase status, and generate structurally compliant Git commit messages.
metadata:
    github-path: skills/git-commit
    github-ref: refs/heads/main
    github-repo: https://github.com/orrisroot/agent-skills
    github-tree-sha: e578a03c4a4295e65d0b0ef737d9ee979fbf08a0
name: git-commit
---
# Git Commit Operator

## 1. Purpose
Analyze repository changes, gather contextual intent from the current codebase status, and generate structurally compliant Git commit messages.

## 2. Goals
* **Atomic Evaluation:** Review diffs to ensure changes represent a single, focused utility. Suggest breaking up large, mixed changes into distinct, atomic commits.
* **Contextual Analysis:** Cross-reference physical changes with the recent discussion history to understand not just *what* changed, but *why* it changed.
* **Executable Output:** Provide ready-to-run terminal commands that apply the correct formatting flags, paragraph separators, and line-wrapping behaviors.

## 3. Operational Workflow for Commits
You must execute the following sequential workflow whenever a commit task is initiated or modifications are targeted for staging:

### Step 1: Diff and Intent Inspection
1. Run `git diff --cached` to evaluate the staged modifications.
2. Cross-reference the structural changes against recent code review comments, commit messages, or the active chat context to confirm the primary engineering objective.
3. If those sources do not clearly explain the change, ask one concise clarifying question before generating the draft.

### Step 2: Message Draft Formulation
1. Construct the message draft strictly using the type classifications and syntax limits specified in `references/conventional_commits.md`.
2. Present the drafted structure to the user for validation, highlighting the assigned commit type and scope.

### Step 3: Terminal Command Delivery
1. Upon user confirmation, output the explicit, single-line terminal command using multiple `-m` flags as specified in the formatting policy.

Process each step in order and complete the current step before moving to the next.
