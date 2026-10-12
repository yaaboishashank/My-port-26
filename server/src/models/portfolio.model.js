import { readFileSync } from 'node:fs';

// Model: the read-only data source. No database or credentials are needed.
// Restart the server after changing this JSON (node --watch handles imported JS).
const portfolio = JSON.parse(
  readFileSync(new URL('../data/portfolio.json', import.meta.url), 'utf8'),
);

export function getPortfolio() {
  return portfolio;
}
export function getProjects() {
  return portfolio.projects;
}
export function findProject(slug) {
  return portfolio.projects.find((project) => project.slug === slug);
}
