const GITHUB_USER = "tomtapia";
const GISTS_API_URL = `https://api.github.com/users/${GITHUB_USER}/gists`;
const MAX_DESCRIPTION_LENGTH = 120;

const TECH_TAGS = {
	vite: { label: "Vite", color: "#646cff" },
	react: { label: "React", color: "#61dafb" },
	docker: { label: "Docker", color: "#2496ed" },
	kubernetes: { label: "Kubernetes", color: "#326ce5" },
	aws: { label: "AWS", color: "#ff9900" },
	gcp: { label: "GCP", color: "#4285f4" },
	azure: { label: "Azure", color: "#0078d4" },
	terraform: { label: "Terraform", color: "#844fba" },
	javascript: { label: "JavaScript", color: "#f7df1e" },
	typescript: { label: "TypeScript", color: "#3178c6" },
	python: { label: "Python", color: "#3776ab" },
	go: { label: "Go", color: "#00add8" },
	"ci/cd": { label: "CI/CD", color: "#00bcd4" },
	devops: { label: "DevOps", color: "#00bcd4" },
	performance: { label: "Performance", color: "#4caf50" },
	security: { label: "Security", color: "#f44336" },
};

function createElement(tag, className, text) {
	const element = document.createElement(tag);
	if (className) element.className = className;
	if (typeof text === "string") element.textContent = text;
	return element;
}

function formatDate(dateString) {
	const formatter = new Intl.DateTimeFormat("en", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
	return formatter.format(new Date(dateString));
}

function getMarkdownFile(gist) {
	const files = Object.values(gist.files);
	return files.find((file) => file.filename.endsWith(".md"));
}

function extractTags(title, description) {
	const text = `${title} ${description}`.toLowerCase();
	const tags = [];
	for (const [key, tag] of Object.entries(TECH_TAGS)) {
		if (text.includes(key)) {
			tags.push(tag);
		}
	}
	return tags.slice(0, 4);
}

function extractDescription(content) {
	if (!content) return "";
	const lines = content.split("\n");
	for (const line of lines) {
		const trimmed = line.trim();
		if (trimmed && !trimmed.startsWith("#") && !trimmed.startsWith("```")) {
			return trimmed.length > MAX_DESCRIPTION_LENGTH
				? `${trimmed.slice(0, MAX_DESCRIPTION_LENGTH)}...`
				: trimmed;
		}
	}
	return "";
}

async function fetchGists() {
	const response = await fetch(GISTS_API_URL);
	if (!response.ok) {
		throw new Error(`Failed to fetch gists: ${response.status}`);
	}
	return response.json();
}

async function fetchMarkdownContent(rawUrl) {
	const response = await fetch(rawUrl);
	if (!response.ok) {
		throw new Error(`Failed to fetch content: ${response.status}`);
	}
	return response.text();
}

async function renderArticleList(gists, container) {
	container.innerHTML = "";

	const markdownGists = gists
		.map((gist) => ({ ...gist, markdownFile: getMarkdownFile(gist) }))
		.filter((gist) => gist.markdownFile)
		.sort(
			(a, b) =>
				new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
		);

	if (markdownGists.length === 0) {
		const empty = createElement("p", "blog-empty", "No articles found.");
		container.append(empty);
		return;
	}

	const grid = createElement("div", "blog-grid");

	for (const gist of markdownGists) {
		const titleText =
			gist.description || gist.markdownFile.filename.replace(/\.md$/i, "");

		let description = "";
		try {
			const content = await fetchMarkdownContent(gist.markdownFile.raw_url);
			description = extractDescription(content);
		} catch {
			description = "";
		}

		const tags = extractTags(titleText, gist.description || "");

		const card = createElement("article", "blog-card");
		const link = createElement("a", "blog-card-link");
		link.href = `#${gist.id}`;

		const title = createElement("h2", "blog-card-title", titleText);

		const meta = createElement("div", "blog-card-meta");
		meta.innerHTML = `<i class="bx bx-calendar"></i> <span>${formatDate(gist.created_at)}</span>`;

		const desc = createElement("p", "blog-card-description", description);

		const tagsContainer = createElement("div", "blog-card-tags");
		for (const tag of tags) {
			const badge = createElement("span", "blog-tag");
			badge.textContent = tag.label;
			badge.style.backgroundColor = `${tag.color}20`;
			badge.style.color = tag.color;
			badge.style.borderColor = `${tag.color}40`;
			tagsContainer.append(badge);
		}

		link.append(title, meta, desc, tagsContainer);
		card.append(link);
		grid.append(card);
	}

	container.append(grid);
}

function renderArticleDetail(gist, content, container) {
	container.innerHTML = "";

	const backLink = createElement("a", "blog-back-link");
	backLink.href = "#";
	backLink.innerHTML = "<i class='bx bx-arrow-back'></i> Back to articles";

	const header = createElement("header", "blog-article-header");
	const titleText =
		gist.description || gist.markdownFile.filename.replace(/\.md$/i, "");
	const title = createElement("h1", "blog-article-title", titleText);
	const meta = createElement("div", "blog-article-meta");
	meta.innerHTML = `<i class="bx bx-calendar"></i> <span>${formatDate(gist.created_at)}</span>`;
	header.append(title, meta);

	const body = createElement("div", "blog-article-body");
	body.innerHTML = window.marked.parse(content);

	const codeBlocks = body.querySelectorAll("pre code");
	for (const block of codeBlocks) {
		window.hljs.highlightElement(block);
	}

	const links = body.querySelectorAll('a[href^="http"]');
	for (const link of links) {
		link.setAttribute("target", "_blank");
		link.setAttribute("rel", "noopener noreferrer");
	}

	container.append(backLink, header, body);
}

export async function initBlog() {
	const container = document.querySelector("#blog-content");
	const loading = document.querySelector("#blog-loading");
	const error = document.querySelector("#blog-error");

	if (!container || !loading || !error) {
		return;
	}

	try {
		const gists = await fetchGists();
		const markdownGists = gists
			.map((gist) => ({ ...gist, markdownFile: getMarkdownFile(gist) }))
			.filter((gist) => gist.markdownFile);

		const hash = window.location.hash.slice(1);

		if (hash) {
			const gist = markdownGists.find((g) => g.id === hash);
			if (gist) {
				const content = await fetchMarkdownContent(gist.markdownFile.raw_url);
				renderArticleDetail(gist, content, container);
				document.title = `${gist.description || "Article"} | Blog | Tomás Tapia`;
			} else {
				error.textContent = "Article not found.";
				error.classList.remove("d-none");
			}
		} else {
			await renderArticleList(markdownGists, container);
		}

		window.addEventListener("hashchange", () => {
			window.location.reload();
		});
	} catch (fetchError) {
		console.error("Blog error:", fetchError);
		error.textContent = "Failed to load articles. Please try again later.";
		error.classList.remove("d-none");
	} finally {
		loading.classList.add("d-none");
	}
}
