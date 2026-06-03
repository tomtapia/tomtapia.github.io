import { resolve } from "node:path";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
	root: "src",
	publicDir: "public",
	server: {
		host: "127.0.0.1",
		port: 8080,
		strictPort: true,
		open: true,
	},
	preview: {
		host: "127.0.0.1",
		port: 4173,
		strictPort: true,
	},
	plugins: [
		createHtmlPlugin({
			minify: true,
		}),
	],
	esbuild: {
		drop: ["console", "debugger"],
	},
	build: {
		outDir: "../dist",
		emptyOutDir: true,
		sourcemap: "hidden",
		rollupOptions: {
			input: {
				index: resolve(__dirname, "src/index.html"),
				privacy: resolve(__dirname, "src/privacy.html"),
				blog: resolve(__dirname, "src/blog.html"),
			},
		},
	},
});
