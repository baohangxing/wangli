console.log(
  [
    "See docs/story-subagent-task.md for the single-story subagent prompt template.",
    "The repo no longer uses a template-based story generator as the default path.",
    "Use the agent workflow: assign a story number and date, give the subagent 1-2 seed words,",
    "then validate the resulting markdown with: npm run validate:stories -- --start <number> --end <number>",
  ].join("\n"),
);
