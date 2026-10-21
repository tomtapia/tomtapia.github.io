const reducedMotionQuery = window.matchMedia?.(
	"(prefers-reduced-motion: reduce)",
);

function prefersReducedMotion() {
	return reducedMotionQuery?.matches ?? false;
}

/**
 * Scroll-triggered reveals.
 * Primary path is a pure CSS view() scroll-driven animation enabled via
 * @supports. This module only compensates for browsers without the native
 * timeline: it hides .reveal elements, reveals them on intersection, and
 * stops observing after activation.
 */
let revealObserver = null;
let revealFallbackActive = false;

function observeRevealTargets(root) {
	if (!revealObserver) {
		return;
	}

	const targets = (root ?? document).querySelectorAll(
		".reveal:not(.is-revealed)",
	);

	targets.forEach((element) => {
		if (element.getBoundingClientRect().top < window.innerHeight) {
			// Already within the viewport: show it without a transition.
			element.classList.add("reveal-instant", "is-revealed");
		} else {
			revealObserver.observe(element);
		}
	});
}

function setupRevealFallback() {
	const supportsViewTimeline =
		typeof CSS !== "undefined" &&
		typeof CSS.supports === "function" &&
		CSS.supports("animation-timeline", "view()");

	if (supportsViewTimeline || !("IntersectionObserver" in window)) {
		return;
	}

	revealFallbackActive = true;
	document.documentElement.classList.add("reveal-fallback");

	revealObserver = new IntersectionObserver(
		(entries, observerInstance) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) {
					continue;
				}

				entry.target.classList.add("is-revealed");
				observerInstance.unobserve(entry.target);
			}
		},
		{ threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
	);

	observeRevealTargets();
}

/**
 * Re-scan for .reveal elements added to the DOM after initialization
 * (e.g. client-rendered blog cards). No-op in browsers that use the native
 * CSS timeline and when the reduced-motion preference is set.
 */
export function refreshRevealFallback() {
	if (revealFallbackActive && !prefersReducedMotion()) {
		observeRevealTargets();
	}
}

/**
 * Reading progress bar.
 * Primary path is a pure CSS scroll() scroll-driven animation enabled via
 * @supports. This rAF-throttled listener is the fallback only.
 */
function setupProgressFallback() {
	const supportsScrollTimeline =
		typeof CSS !== "undefined" &&
		typeof CSS.supports === "function" &&
		CSS.supports("animation-timeline", "scroll()");

	if (supportsScrollTimeline) {
		return;
	}

	const bar = document.querySelector(".reading-progress");

	if (!bar) {
		return;
	}

	let ticking = false;

	const update = () => {
		ticking = false;
		const scrollable =
			document.documentElement.scrollHeight - window.innerHeight;

		if (scrollable <= 0) {
			bar.style.transform = "scaleX(0)";
			return;
		}

		const progress = Math.min(1, Math.max(0, window.scrollY / scrollable));
		bar.style.transform = `scaleX(${progress})`;
	};

	window.addEventListener(
		"scroll",
		() => {
			if (!ticking) {
				ticking = true;
				window.requestAnimationFrame(update);
			}
		},
		{ passive: true },
	);

	window.addEventListener("resize", update, { passive: true });

	update();
}

export function initSiteEffects() {
	setupProgressFallback();
	setupRevealFallback();
}
