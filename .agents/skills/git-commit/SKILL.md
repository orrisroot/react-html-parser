---
description: Analyze repository changes, gather contextual intent from the current codebase status, and generate structurally compliant Git commit messages.
metadata:
    github-path: skills/git-commit
    github-ref: refs/heads/main
    github-repo: https://github.com/orrisroot/agent-skills
    github-tree-sha: 332b6fc533ae9085eafbba6827ff7798c85e4b38
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

### Step 3: Message Validation
1. After drafting the message in Step 2, validate it against **every rule** listed in `references/conventional_commits.md` before proceeding. Check the following:
   * **Type:** The commit type must be one of the allowed types (feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert).
   * **Language:** The entire message must be in English (unless the user explicitly requested another language).
   * **Case & Punctuation:** The description must be lowercase and must NOT end with a period.
   * **Imperative Mood:** The description must use imperative mood (e.g., "add", not "added" or "adds").
   * **Line Length:** The subject line must not exceed 72 characters. **Every line in the body must also be wrapped at 72 characters or less.** If any line exceeds this limit, insert line breaks to fix it.
   * **`-m` Flags:** The command must use at most three `-m` flags (one per structural part). Body lines must NOT be split across multiple `-m` flags.
   * **Literal Newlines:** Multi-line body/footer content must use **literal newlines** inside double-quoted strings, NOT `\n` escape sequences (which shells commit as literal backslash-n).
   * **Co-authored-by:** No `Co-authored-by:` trailers unless explicitly requested.
2. If **any** rule is violated, fix the draft and re-validate from step 1. Repeat this loop until all checks pass. Only proceed to Step 4 once the message passes every validation check.

### Step 4: Terminal Command Delivery
1. Upon user confirmation, output the explicit, single-line terminal command using at most three `-m` flags as specified in the formatting policy.
   * **CRITICAL:** Use at most one `-m` flag per structural part (Subject, Body, and Footer).
   * **NEVER** use multiple `-m` flags for individual lines or bullet points within the body. Doing so causes Git to insert unwanted blank lines.
   * **CRITICAL:** For multi-line body or footer content, you must use a single double-quoted string containing **literal newlines (actual line breaks)** within the command. Do NOT use escape sequences like `\n` (which shell command execution will commit literally) or additional `-m` flags.

Process each step in order and complete the current step before moving to the next.
