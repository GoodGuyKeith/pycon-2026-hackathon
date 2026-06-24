# Project Codex Guidance

Repo-level working agreements for Codex in this workspace.

## Goal Tracking

- Trigger the `@goal` skill or `/goal` command, whichever is available in the current Codex surface, for any task that is likely to take a few minutes, involve multiple steps, require implementation plus verification, or continue across tool calls.
- Automatically create a formal goal for any task that is likely to take a few minutes, involve multiple steps, require implementation plus verification, or continue across tool calls.
- Treat long-running work as goal-worthy by default, even if the user does not explicitly ask for goal tracking in that turn.
- If formal goal creation is not available in the current environment, use a visible checklist and progress updates as the fallback.

## Accuracy, Recency, And Sourcing

When a request depends on recency, such as "latest", "current", "today", or "as of now":

1. Establish the current date/time and state it explicitly in ISO format.
   - Preferred command: `date -Is`
2. Prefer official or primary sources when researching.
   - Use upstream vendor docs for dependencies such as language runtimes, frameworks, and cloud providers.
3. Prefer the most recent authoritative information.
   - Use the newest versioned docs, release notes, or changelogs.
   - Cross-check at least two reputable sources when details are safety-sensitive or compatibility-sensitive.

### Context7 MCP

- Use Context7 when library or API docs are needed and the tool is available.
- If known, pin the library with slash syntax, for example: `use library /supabase/supabase`.
- Mention the target version.
- Fetch minimal targeted docs and summarize them. Do not dump large documentation excerpts.

### Web Search Policy

- Enable and use web search only when it materially improves correctness, such as for up-to-date APIs, recent advisories, or release notes.
- Prefer official docs and primary sources. Otherwise, use Context7 MCP or reputable, widely cited references.
- Record source dates, such as publish or release dates, when relevant.

## Default Autonomy And Safety

- Default to read-only exploration and analysis.
- When edits are needed, prefer workspace-scoped write access and keep changes inside the repo.
- When interacting with remote APIs, use read-only calls unless explicitly instructed otherwise by the user.
- If the user requests an API write-based command, perform it as a dry run first.
- Never make destructive calls to remote APIs or production data sources.

### Editing Files

- Make the smallest safe change that solves the issue.
- Preserve existing style and conventions.
- Prefer patch-style edits with small, reviewable diffs over full-file rewrites.
- After making changes, run the project's standard checks when feasible, such as format, lint, unit tests, build, or typecheck.

### Reading Project Documents

For PDFs, uploads, long text, CSVs, and similar project documents:

- Read the full document first.
- Draft the output.
- Before finalizing, re-read the original source to verify:
  - factual accuracy,
  - no invented details,
  - wording and style are preserved unless the user explicitly asked for a rewrite.
- If paraphrasing is required, label it explicitly as a paraphrase.

### Container-First Policy

- Never install system packages on the host unless explicitly instructed.
- Prefer container images to supply tooling used by the project.
- For code projects and dependencies, use containers by default when feasible.
- If the repo has an existing container workflow, such as a `Dockerfile`, compose file, or Makefile targets, follow it.
- If the repo has no container workflow and containerization is needed, create a minimal one.
- Keep repo-specific container details in this file.

### Secrets And Sensitive Data

- Never print secrets, tokens, private keys, or credentials to terminal output.
- Do not request that users paste secrets.
- Avoid commands that might expose secrets, such as dumping environment variables broadly or reading private key files.
- Prefer existing authenticated CLIs.
- Redact sensitive strings in any displayed output.

## Baseline Workflow

Start every task by determining:

1. Goal and acceptance criteria.
2. Constraints, including time, safety, and scope.
3. What must be inspected, such as files, commands, tests, or docs.
4. Whether the request depends on recency. If yes, apply the accuracy, recency, and sourcing rules.
5. Whether requirements are ambiguous. Ask targeted clarifying questions before making irreversible changes.

## Continuity

Maintain a single continuity file for the current workspace: `.agent/CONTINUITY.md`.

- `.agent/CONTINUITY.md` is a living document and canonical briefing designed to survive compaction.
- Do not rely on earlier chat or tool output unless it is reflected there.
- At the start of each assistant turn, read `.agent/CONTINUITY.md` before acting when the file exists.

### Continuity File Format

Update `.agent/CONTINUITY.md` only when there is a meaningful delta in:

- `[PLANS]`: Plans Log is a guide for the next contributor as much as a checklist.
- `[DECISIONS]`: Decisions Log records decisions made.
- `[PROGRESS]`: Progress Log records course changes during implementation, why they happened, and their implications.
- `[DISCOVERIES]`: Discoveries Log records optimizer behavior, performance tradeoffs, unexpected bugs, or inverse/unapply semantics that shaped the approach. Include short evidence snippets when useful, especially test output.
- `[OUTCOMES]`: Outcomes Log summarizes what was achieved, what remains, and lessons learned at completion of a major task or full plan.

### Continuity Anti-Drift Rules

- Keep facts only. Do not include transcripts or raw logs.
- Every entry must include:
  - a date in ISO timestamp format, for example `2026-01-13T09:42Z`,
  - a provenance tag, such as `[USER]`, `[CODE]`, `[TOOL]`, or `[ASSUMPTION]`.
- If unknown, write `UNCONFIRMED`. Never guess.
- If something changes, supersede it explicitly instead of silently rewriting history.
- Keep the file bounded, short, and high-signal.
- If sections become bloated, compress older items into milestone bullets tagged `[MILESTONE]`.

## Definition Of Done

A task is done when:

- the requested change is implemented or the question is answered,
- verification is provided,
- build is attempted when source code changed,
- linting is run when source code changed,
- errors and warnings are addressed or explicitly listed as out of scope,
- tests or typecheck are run as applicable,
- documentation is updated for impacted areas,
- impact is explained, including what changed, where, and why,
- follow-ups are listed if anything was intentionally left out,
- `.agent/CONTINUITY.md` is updated if the change materially affects goal, state, or decisions.
