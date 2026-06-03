const GITHUB_USER = "tomtapia";
const GISTS_API_URL = `https://api.github.com/users/${GITHUB_USER}/gists`;
const ARTICLES_PER_PAGE = 3;
const MAX_DESCRIPTION_LENGTH = 200;

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

let currentPage = 1;
let allArticles = [];

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
	return tags.slice(0, 5);
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

function createTagElement(tag) {
	const badge = createElement("span", "blog-tag");
	badge.textContent = tag.label;
	badge.style.backgroundColor = `${tag.color}18`;
	badge.style.color = tag.color;
	badge.style.borderColor = `${tag.color}40`;
	return badge;
}

async function enrichArticles(gists) {
	const markdownGists = gists
		.map((gist) => ({ ...gist, markdownFile: getMarkdownFile(gist) }))
		.filter((gist) => gist.markdownFile)
		.sort(
			(a, b) =>
				new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
		);

	const enriched = [];
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
		enriched.push({ ...gist, titleText, description, tags });
	}
	return enriched;
}

function renderFeaturedCard(article) {
	const card = createElement("article", "blog-featured-card");

	const titleLink = createElement("a", "");
	titleLink.href = `#${article.id}`;

	const label = createElement("span", "blog-featured-label", "Article");
	const title = createElement("h2", "blog-featured-title");
	title.append(titleLink);
	titleLink.textContent = article.titleText;

	const desc = createElement(
		"p",
		"blog-featured-description",
		article.description,
	);

	const meta = createElement("div", "blog-featured-meta");
	const date = createElement("span", "blog-featured-date");
	date.innerHTML = `<i class="bx bx-calendar"></i> <span>${formatDate(article.created_at)}</span>`;
	meta.append(date);

	if (article.tags.length > 0) {
		const tagsContainer = createElement("div", "blog-featured-tags");
		for (const tag of article.tags) {
			tagsContainer.append(createTagElement(tag));
		}
		meta.append(tagsContainer);
	}

	const readBtn = createElement("a", "blog-read-btn", "Read Article");
	readBtn.href = `#${article.id}`;

	card.append(label, title, desc, meta, readBtn);
	return card;
}

function renderPagination(totalPages, container) {
	container.innerHTML = "";
	if (totalPages <= 1) return;

	const pagination = createElement("div", "blog-pagination");

	const prevBtn = createElement("button", "blog-page-btn", "<");
	prevBtn.disabled = currentPage === 1;
	prevBtn.addEventListener("click", () => {
		if (currentPage > 1) {
			currentPage--;
			renderArticleList();
		}
	});
	pagination.append(prevBtn);

	for (let i = 1; i <= totalPages; i++) {
		const btn = createElement("button", "blog-page-btn", String(i));
		if (i === currentPage) btn.classList.add("active");
		btn.addEventListener("click", () => {
			currentPage = i;
			renderArticleList();
		});
		pagination.append(btn);
	}

	const nextBtn = createElement("button", "blog-page-btn", ">");
	nextBtn.disabled = currentPage === totalPages;
	nextBtn.addEventListener("click", () => {
		if (currentPage < totalPages) {
			currentPage++;
			renderArticleList();
		}
	});
	pagination.append(nextBtn);

	container.append(pagination);
}

function renderArticleList() {
	const container = document.querySelector("#blog-articles-list");
	const paginationContainer = document.querySelector("#blog-pagination");
	if (!container) return;

	container.innerHTML = "";

	const totalPages = Math.ceil(allArticles.length / ARTICLES_PER_PAGE);
	const start = (currentPage - 1) * ARTICLES_PER_PAGE;
	const pageArticles = allArticles.slice(start, start + ARTICLES_PER_PAGE);

	for (const article of pageArticles) {
		container.append(renderFeaturedCard(article));
	}

	renderPagination(totalPages, paginationContainer);
}

function renderSidebar() {
	const container = document.querySelector("#blog-sidebar");
	if (!container) return;

	container.innerHTML = "";

	// Newsletter
	const newsletterSection = createElement("div", "blog-sidebar-section");
	const newsLabel = createElement(
		"span",
		"blog-featured-label",
		"Newsletter Signup",
	);
	const newsTitle = createElement(
		"h3",
		"blog-newsletter-title",
		"Stay Updated",
	);
	const newsDesc = createElement(
		"p",
		"blog-newsletter-desc",
		"Stay updated and receive our blog's new articles. Subscribe to our newsletter for the latest content.",
	);

	const form = createElement("div", "blog-newsletter-form");
	const input = createElement("input", "blog-newsletter-input");
	input.type = "email";
	input.placeholder = "Email";
	const btn = createElement("button", "blog-newsletter-btn", "Subscribe");
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		btn.textContent = "Subscribed!";
		btn.disabled = true;
		input.value = "";
		setTimeout(() => {
			btn.textContent = "Subscribe";
			btn.disabled = false;
		}, 2000);
	});
	form.append(input, btn);

	newsletterSection.append(newsLabel, newsTitle, newsDesc, form);
	container.append(newsletterSection);

	// Latest Posts
	const postsSection = createElement("div", "blog-sidebar-section");
	const postsTitle = createElement("h3", "blog-sidebar-title", "Latest Posts");
	postsSection.append(postsTitle);

	const sidebarArticles = allArticles.slice(0, 6);
	for (const article of sidebarArticles) {
		const item = createElement("div", "blog-sidebar-item");

		const itemTitle = createElement("h4", "blog-sidebar-item-title");
		const itemLink = createElement("a", "", article.titleText);
		itemLink.href = `#${article.id}`;
		itemTitle.append(itemLink);

		const itemMeta = createElement("div", "blog-sidebar-item-meta");
		itemMeta.innerHTML = `<i class="bx bx-calendar"></i> <span>${formatDate(article.created_at)}</span>`;

		const itemDesc = createElement(
			"p",
			"blog-sidebar-item-desc",
			article.description,
		);

		const itemTags = createElement("div", "blog-sidebar-item-tags");
		for (const tag of article.tags.slice(0, 4)) {
			itemTags.append(createTagElement(tag));
		}

		item.append(itemTitle, itemMeta, itemDesc, itemTags);
		postsSection.append(item);
	}

	container.append(postsSection);
}

function renderArticleDetail(article, content) {
	const listContainer = document.querySelector("#blog-articles-list");
	const paginationContainer = document.querySelector("#blog-pagination");
	const sidebar = document.querySelector("#blog-sidebar");

	if (listContainer) listContainer.innerHTML = "";
	if (paginationContainer) paginationContainer.innerHTML = "";
	if (sidebar) sidebar.style.display = "none";

	const container = createElement("div", "col-12");

	const backLink = createElement("a", "blog-back-link");
	backLink.href = "#";
	backLink.innerHTML = "<i class='bx bx-arrow-back'></i> Back to articles";
	backLink.addEventListener("click", (e) => {
		e.preventDefault();
		window.location.hash = "";
		if (sidebar) sidebar.style.display = "";
		renderArticleList();
		renderSidebar();
	});

	const header = createElement("header", "blog-article-header");
	const title = createElement("h1", "blog-article-title", article.titleText);
	const meta = createElement("div", "blog-article-meta");
	meta.innerHTML = `<i class="bx bx-calendar"></i> <span>${formatDate(article.created_at)}</span>`;
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

	const row = document.querySelector("#blog-content");
	if (row) {
		row.innerHTML = "";
		row.appendChild(container);
	}
}

export async function initBlog() {
	const loading = document.querySelector("#blog-loading");
	const error = document.querySelector("#blog-error");

	if (!loading || !error) {
		return;
	}

	try {
		const gists = await fetchGists();
		allArticles = await enrichArticles(gists);

		const hash = window.location.hash.slice(1);

		if (hash) {
			const article = allArticles.find((a) => a.id === hash);
			if (article) {
				const content = await fetchMarkdownContent(
					article.markdownFile.raw_url,
				);
				renderArticleDetail(article, content);
				document.title = `${article.titleText} | Blog | Tomás Tapia`;
			} else {
				error.textContent = "Article not found.";
				error.classList.remove("d-none");
			}
		} else {
			renderArticleList();
			renderSidebar();
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
