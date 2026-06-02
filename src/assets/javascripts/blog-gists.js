const GITHUB_USER = "tomtapia";
const GISTS_API_URL = `https://api.github.com/users/${GITHUB_USER}/gists`;

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

function renderArticleList(gists, container) {
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
		const card = createElement("article", "blog-card");
		const link = createElement("a", "blog-card-link");
		link.href = `#${gist.id}`;

		const titleText =
			gist.description || gist.markdownFile.filename.replace(/\.md$/i, "");
		const title = createElement("h2", "blog-card-title", titleText);

		const meta = createElement("div", "blog-card-meta");
		meta.innerHTML = `<i class="bx bx-calendar"></i> <span>${formatDate(gist.created_at)}</span>`;

		const filename = createElement(
			"p",
			"blog-card-filename",
			gist.markdownFile.filename,
		);

		link.append(title, meta, filename);
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
	// eslint-disable-next-line no-undef
	body.innerHTML = marked.parse(content);

	// Apply syntax highlighting
	const codeBlocks = body.querySelectorAll("pre code");
	for (const block of codeBlocks) {
		// eslint-disable-next-line no-undef
		hljs.highlightElement(block);
	}

	// Open external links in new tab
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
			renderArticleList(markdownGists, container);
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
