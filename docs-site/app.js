'use strict';

const moduleStyle = document.querySelector('#module-style');
const apiStyle = document.querySelector('#api-style');
const startPath = document.querySelector('#start-path');
const clue = document.querySelector('#clue');
const output = document.querySelector('#result-output code');
const candidates = document.querySelector('#candidate-output code');
const statusText = document.querySelector('#status-text');
const candidateFact = document.querySelector('#candidate-fact');
const separatorFact = document.querySelector('#separator-fact');
const resultFact = document.querySelector('#result-fact');

document.querySelector('#generate-button').addEventListener('click', render);
for (const control of [moduleStyle, apiStyle, startPath, clue]) {
  control.addEventListener('input', render);
}

document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-copy]');
  if (!button) return;
  const target = document.querySelector(button.dataset.copy);

  try {
    await navigator.clipboard.writeText(target.textContent.trim());
    statusText.textContent = 'Copied to clipboard';
  } catch {
    statusText.textContent = 'Copy unavailable';
  }
});

render();

function render() {
  const start = startPath.value.trim();
  const marker = clue.value.trim();
  if (!start || !marker) {
    output.textContent = '// Enter both a start path and a clue.';
    candidates.textContent = 'No candidates';
    statusText.textContent = 'Start path and clue required';
    return;
  }

  const directories = traversalCandidates(start);
  const checks = [...new Set(directories.map((directory) => joinCandidate(directory, marker)))];
  candidates.textContent = checks.map((candidate, index) => (
    `${String(index + 1).padStart(2, '0')}  ${candidate}`
  )).join('\n');
  output.textContent = createProgram({
    api: apiStyle.value,
    commonjs: moduleStyle.value === 'commonjs',
    marker,
    start
  });
  candidateFact.textContent = `${checks.length} distinct ${checks.length === 1 ? 'candidate' : 'candidates'}`;
  separatorFact.textContent = start.includes('\\') ? 'Windows-style input' : 'POSIX-style input';
  resultFact.textContent = 'first match or null';
  statusText.textContent = 'Traversal plan ready';
}

function createProgram({ api, commonjs, marker, start }) {
  const importLine = commonjs
    ? "const findParentDir = require('@stackline/find-parent-dir')"
    : "import findParentDir from '@stackline/find-parent-dir'";
  const argumentsList = `${JSON.stringify(start)}, ${JSON.stringify(marker)}`;

  if (api === 'sync') {
    return `${importLine}\n\ntry {\n  const directory = findParentDir.sync(${argumentsList})\n  console.log(directory)\n} catch (error) {\n  console.error(error)\n}`;
  }
  if (api === 'promise') {
    return `${importLine}\n\ntry {\n  const directory = await findParentDir.promise(${argumentsList})\n  console.log(directory)\n} catch (error) {\n  console.error(error)\n}`;
  }
  return `${importLine}\n\nfindParentDir(${argumentsList}, (error, directory) => {\n  if (error) throw error\n  console.log(directory)\n})`;
}

function traversalCandidates(value) {
  let parts = value.split(/(\/|\\)/);
  if (parts.length > 0 && parts[0].length === 0) parts = parts.slice(1);
  const result = [];
  while (parts.length > 0) {
    result.push(parts.join(''));
    parts = parts.slice(0, -1);
  }
  return result;
}

function joinCandidate(directory, marker) {
  if (directory.endsWith('/') || directory.endsWith('\\')) return `${directory}${marker}`;
  const separator = directory.includes('\\') ? '\\' : '/';
  return `${directory}${separator}${marker}`;
}
