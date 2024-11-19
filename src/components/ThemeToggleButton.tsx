import {
	type Component,
	Index,
	Show,
	createEffect,
	createRenderEffect,
	createSignal,
} from "solid-js";

const theme = "preferred_color_scheme";

export function updateGiscusTheme(newTheme) {
	const iframe = document.querySelector("iframe.giscus-frame");
	if (iframe) {
		iframe.contentWindow.postMessage(
			{ giscus: { setConfig: { theme: newTheme } } },
			"https://giscus.app",
		);
	}
}

const ThemeToggleButton: Component<{}> = (props) => {
	const rootEl =
		typeof document !== "undefined" ? document.documentElement : null;
	const themes = ["light", "dark"];

	const test = () => {
		if (rootEl?.classList.contains("dark")) {
			return "dark";
		}
		if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
			return localStorage.getItem("theme") ?? "light";
		}
		if (
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		) {
			return "dark";
		}
		return "dark";
	};
	const [theme, setTheme] = createSignal<"light" | "dark">(test());

	let teset: Timer;

	createEffect(() => {
		clearTimeout(teset);

		if (rootEl && theme() === "light") {
			document.body.classList.add("colorTransition");
			rootEl.classList.remove("dark");
			teset = setTimeout(() => {
				document.body.classList.remove("colorTransition");
			}, 1000);
		} else if (rootEl && theme() === "dark") {
			document.body.classList.add("colorTransition");
			rootEl.classList.add("dark");
			teset = setTimeout(() => {
				document.body.classList.remove("colorTransition");
			}, 1000);
		}
	});

	return (
		<div class="flex items-center justify-center">
			<Show
				when={theme() === "dark"}
				fallback={
					<button
						type="button"
						onClick={() => {
							setTheme("dark");
							localStorage.setItem("theme", theme());
							updateGiscusTheme("dark");
						}}
					>
						<svg
							class="fill-black"
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 20 20"
						>
							<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
						</svg>
					</button>
				}
			>
				<button
					type="button"
					onClick={() => {
						setTheme("light");
						localStorage.setItem("theme", theme());
						updateGiscusTheme("light");
					}}
				>
					<svg
						class="fill-black"
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 20 20"
					>
						<path
							fill-rule="evenodd"
							d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			</Show>
		</div>
	);
};

export default ThemeToggleButton;
