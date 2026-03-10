const GITHUB_USER = 'tomtapia';
const REPOSITORY_LIMIT = 6;
const EXCLUDED_REPOSITORIES = new Set(['tomtapia.github.io']);
const API_URL = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`;

function getProjectIcon(language) {
  const normalized = (language || '').toLowerCase();

  if (normalized.includes('typescript') || normalized.includes('javascript')) {
    return 'bxl-javascript';
  }

  if (normalized.includes('python')) {
    return 'bxl-python';
  }

  if (normalized.includes('go')) {
    return 'bx-code-alt';
  }

  if (normalized.includes('java')) {
    return 'bxl-java';
  }

  if (normalized.includes('html') || normalized.includes('css')) {
    return 'bx-layout';
  }

  if (normalized.includes('shell')) {
    return 'bx-terminal';
  }

  return 'bx-code-curly';
}

function formatUpdatedAt(updatedAt) {
  const formatter = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return `Updated ${formatter.format(new Date(updatedAt))}`;
}

function createElement(tagName, className, text) {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (typeof text === 'string') {
    element.textContent = text;
  }

  return element;
}

function createBadge(text) {
  return createElement('span', 'tech-badge', text);
}

function createMetaItem(iconClass, text) {
  const item = createElement('span', 'project-meta-item');
  const icon = createElement('i', `bx ${iconClass}`);

  item.append(icon, ` ${text}`);

  return item;
}

function buildProjectCard(repository) {
  const column = createElement('div', 'col-md-6 col-lg-4');
  const item = createElement('div', 'project-item');
  const card = createElement('div', 'project-card');
  const header = createElement('div', 'project-card-header');
  const image = createElement('div', 'project-image');
  const icon = createElement('i', `bx ${getProjectIcon(repository.language)} project-icon`);
  const heading = createElement('div', 'project-heading');
  const content = createElement('div', 'project-content');
  const title = createElement('h3', 'project-title', repository.name);
  const description = createElement(
    'p',
    'project-description',
    repository.description || 'No description available.'
  );
  const updated = createElement('p', 'project-updated', formatUpdatedAt(repository.updated_at));
  const meta = createElement('div', 'project-meta');
  const tech = createElement('div', 'project-tech');
  const links = createElement('div', 'project-links');
  const button = createElement('a', 'btn btn-sm btn-outline-primary');
  const buttonIcon = createElement('i', 'bx bxl-github');
  const stats = createElement('span', 'project-stats', `${repository.stargazers_count} stars · ${repository.forks_count} forks`);

  button.href = repository.html_url;
  button.target = '_blank';
  button.rel = 'noopener noreferrer';
  button.append(buttonIcon, ' View Repository');

  meta.append(
    createMetaItem('bx-code-alt', repository.language || 'Code')
  );

  image.append(icon);
  if (repository.homepage) {
    tech.append(createBadge('Homepage'));
  }

  heading.append(title, updated);
  header.append(image, heading);
  links.append(button, stats);

  content.append(description, meta);
  if (tech.childElementCount > 0) {
    content.append(tech);
  }
  content.append(links);
  card.append(header, content);
  item.append(card);
  column.append(item);

  return column;
}

function showFeedback(element, message) {
  const messageNode = element.querySelector('p');

  if (messageNode) {
    messageNode.textContent = message;
  }

  element.classList.remove('d-none');
}

function normalizeRepositories(repositories) {
  const filtered = repositories
    .filter((repository) => !repository.fork)
    .filter((repository) => !repository.archived)
    .filter((repository) => !EXCLUDED_REPOSITORIES.has(repository.name))
    .sort((left, right) => new Date(right.updated_at).getTime() - new Date(left.updated_at).getTime());

  const withDescription = filtered.filter((repository) => repository.description?.trim());

  if (withDescription.length >= REPOSITORY_LIMIT) {
    return withDescription.slice(0, REPOSITORY_LIMIT);
  }

  return filtered.slice(0, REPOSITORY_LIMIT);
}

async function fetchRepositories() {
  const response = await fetch(API_URL, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API request failed with status ${response.status}`);
  }

  return response.json();
}

export async function initFeaturedProjects() {
  const grid = document.querySelector('#featured-projects-grid');
  const loading = document.querySelector('#featured-projects-loading');
  const error = document.querySelector('#featured-projects-error');

  if (!grid || !loading || !error) {
    return;
  }

  try {
    const repositories = normalizeRepositories(await fetchRepositories());

    if (repositories.length === 0) {
      showFeedback(error, 'No public repositories matched the current filters.');
      return;
    }

    repositories.forEach((repository) => {
      grid.append(buildProjectCard(repository));
    });
  } catch (fetchError) {
    console.error('Failed to load featured projects from GitHub.', fetchError);
    showFeedback(error, 'Projects could not be loaded right now.');
  } finally {
    loading.remove();
  }
}
