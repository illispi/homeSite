import mdx from "@astrojs/mdx";
import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";

// https://astro.build/config
export default defineConfig({
	site: "https://delvis.org",
	integrations: [mdx(), solid(), tailwind()],
	output: "static",
	markdown: {
		// shikiConfig: {
		//   theme: "nord",
		// },
		remarkPlugins: [remarkGfm, remarkSmartypants],
		rehypePlugins: [
			[
				rehypeExternalLinks,
				{
					target: "_blank",
				},
			],
		],
	},
});
