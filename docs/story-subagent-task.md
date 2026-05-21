# Story Subagent Task Template

Use this template when asking a subagent to write one story from minimal seed words.

## Required inputs
- story number: unique integer, for example 3
- date: valid date string in YYYY-MM-DD, for example 2026-05-22
- seed words: one or two short words or phrases, for example `灯会` or `旧书, 雨天`

## Task prompt template

Write one complete Chinese story markdown file for this repo.

Hard constraints:
- Output must be a complete markdown document only.
- Use this exact frontmatter shape:
  ---
  title: {number}. {title}
  date: {date}
  tags: [tag1, tag2, tag3]
  description: one-sentence summary
  ---
- The file will be saved under story/{number}.{slug}.md, so the title must start with the same number.
- The story must fit the repo tone: warm, bright, gentle, youthful, suitable for young female readers.
- Allowed directions: healing, companionship, light romance, light comedy, animal stories, soft fantasy.
- Forbidden directions: horror, dark violence, explicit sexual content, political topics, disturbing endings.
- Body must be a finished story, not an outline, and should be at least around 3000 Chinese characters.
- The story must naturally include:
  - clear main characters
  - a recurring object or image
  - a stable place/background
  - a time node or seasonal cue
  - an ending that lands softly instead of cutting off abruptly
- Do not reuse obviously templated opening lines or repeated transition paragraphs.
- Keep language natural and varied. Avoid turning the whole piece into the same paragraph pattern used elsewhere.

Creative freedom:
- Only the following seed words are mandatory inspiration: {seedWords}
- Everything else can be invented freely as long as it stays within the tone and constraints above.

Output rule:
- Return markdown only, with no explanation before or after.

## Example filled inputs
- number: 12
- date: 2026-05-31
- seed words: 灯会, 旧书
