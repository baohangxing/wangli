import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const storyDir = path.join(rootDir, "story");
const args = parseArgs(process.argv.slice(2));
const start = args.start ? Number(args.start) : null;
const end = args.end ? Number(args.end) : null;

main();

function main() {
  if (!fs.existsSync(storyDir)) {
    throw new Error(`Story directory not found: ${storyDir}`);
  }

  const files = fs
    .readdirSync(storyDir)
    .filter((fileName) => fileName.endsWith(".md"))
    .filter((fileName) => withinRequestedRange(fileName));

  const issues = [];
  const duplicateFirstSentences = new Map();
  const seenSlugs = new Set();
  const seenNumbers = new Map();

  for (const fileName of files) {
    const filePath = path.join(storyDir, fileName);
    const raw = fs.readFileSync(filePath, "utf8");
    const story = parseStory(fileName, raw);

    if (seenSlugs.has(story.slug)) {
      issues.push(`${fileName}: duplicate slug ${story.slug}`);
    }
    seenSlugs.add(story.slug);

    if (story.number !== null) {
      const previousFile = seenNumbers.get(story.number);
      if (previousFile) {
        issues.push(
          `${fileName}: duplicate story number ${story.number}, already used by ${previousFile}`,
        );
      }
      seenNumbers.set(story.number, fileName);
    }

    issues.push(...validateStory(story));

    const firstSentence = extractFirstSentence(story.content);
    if (firstSentence) {
      const users = duplicateFirstSentences.get(firstSentence) ?? [];
      users.push(fileName);
      duplicateFirstSentences.set(firstSentence, users);
    }
  }

  for (const [sentence, fileNames] of duplicateFirstSentences.entries()) {
    if (fileNames.length > 1) {
      issues.push(
        `duplicate first sentence across files: ${fileNames.join(", ")} => ${sentence}`,
      );
    }
  }

  if (issues.length > 0) {
    console.error(
      `Checked ${files.length} story files. Found ${issues.length} issue(s).`,
    );
    for (const issue of issues) {
      console.error(`- ${issue}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`Checked ${files.length} story files. No issues found.`);
}

function withinRequestedRange(fileName) {
  const match = fileName.match(/^(\d+)\./);
  if (!match) {
    return start === null && end === null;
  }

  const number = Number(match[1]);
  if (start !== null && number < start) return false;
  if (end !== null && number > end) return false;
  return true;
}

function parseStory(fileName, raw) {
  const slug = fileName.replace(/\.md$/, "");
  const fileNumberMatch = fileName.match(/^(\d+)\./);
  const number = fileNumberMatch ? Number(fileNumberMatch[1]) : null;
  const frontmatterMatch = raw.match(
    /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/,
  );

  if (!frontmatterMatch) {
    return {
      fileName,
      slug,
      number,
      raw,
      content: raw,
      data: {},
      frontmatterLines: [],
    };
  }

  const frontmatterLines = frontmatterMatch[1].split(/\r?\n/);
  const data = {};
  for (const line of frontmatterLines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    const value = line.slice(colonIndex + 1).trim();
    data[key] = value;
  }

  return {
    fileName,
    slug,
    number,
    raw,
    content: frontmatterMatch[2],
    data,
    frontmatterLines,
  };
}

function validateStory(story) {
  const issues = [];
  const requiredKeys = ["title", "date", "tags", "description"];

  if (story.frontmatterLines.length === 0) {
    issues.push(`${story.fileName}: missing frontmatter block`);
    return issues;
  }

  for (const key of requiredKeys) {
    if (!story.data[key]) {
      issues.push(`${story.fileName}: missing ${key}`);
    }
  }

  const tagsLine = story.frontmatterLines.find((line) =>
    line.trimStart().startsWith("tags:"),
  );
  if (!tagsLine || !/^tags:\s*\[.*\]\s*$/u.test(tagsLine.trim())) {
    issues.push(`${story.fileName}: tags must use inline array syntax [a, b]`);
  }

  const titleValue = unquote(story.data.title);
  if (!titleValue) {
    issues.push(`${story.fileName}: empty title`);
  }

  if (story.number !== null && titleValue) {
    const titleNumberMatch = titleValue.match(/^(\d+)\./);
    if (!titleNumberMatch) {
      issues.push(`${story.fileName}: title must start with ${story.number}.`);
    } else if (Number(titleNumberMatch[1]) !== story.number) {
      issues.push(
        `${story.fileName}: title number ${titleNumberMatch[1]} does not match file number ${story.number}`,
      );
    }
  }

  const dateValue = unquote(story.data.date);
  if (!dateValue || Number.isNaN(new Date(dateValue).getTime())) {
    issues.push(`${story.fileName}: invalid date ${dateValue || "(empty)"}`);
  }

  const descriptionValue = unquote(story.data.description);
  if (!descriptionValue) {
    issues.push(`${story.fileName}: empty description`);
  }

  if (story.content.trim().length < 1200) {
    issues.push(
      `${story.fileName}: body is too short (${story.content.trim().length} chars)`,
    );
  }

  return issues;
}

function extractFirstSentence(content) {
  const firstParagraph = content
    .split(/\r?\n\r?\n/)
    .map((paragraph) => paragraph.trim())
    .find(Boolean);

  if (!firstParagraph) return "";

  const sentenceMatch = firstParagraph.match(/^.*?[。！？!?]/u);
  return sentenceMatch ? sentenceMatch[0].trim() : firstParagraph;
}

function unquote(value) {
  if (typeof value !== "string") return "";
  return value.replace(/^['"]|['"]$/g, "").trim();
}

function parseArgs(argv) {
  const result = {};

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith("--")) continue;

    const [key, inlineValue] = arg.slice(2).split("=");
    if (inlineValue !== undefined) {
      result[key] = inlineValue;
      continue;
    }

    const next = argv[index + 1];
    if (next && !next.startsWith("--")) {
      result[key] = next;
      index += 1;
      continue;
    }

    result[key] = true;
  }

  return result;
}
