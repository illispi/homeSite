---
title: Thoughts after doing solid hack 2024
publishDate: 18 november 2024
description: post mortem
---

![Web app img](/assets/blog/SeinTrack/seintrack.png)

## Intro

Link to project demo: [SeinTrack](https://demoseintrack.delvis.org/)

The purpose of SeinTrack is to help you allocate a set number of hours to work on your projects consistently. You can define daily target hours, log them in the app, and build a streak to stay on track. The app is designed to be self-hosted behind an authentication proxy.

SeinTrack was developed as a submission for Solid Hack 2024, and voting is currently ongoing.

## Features

One feature I’m particularly proud of is enabling menu closure using the back navigation gesture on mobile devices. Most websites don’t handle this; instead, users are required to close menus by clicking an "X" or tapping outside the menu. Typically, a back gesture just navigates to the previous page. By implementing this feature, I made the app feel more like a native mobile application.

The implementation is straightforward and relies on search parameters, as shown below:

```js
const BackNav: ParentComponent<{ setOpen: Setter<boolean>; open: boolean }> = (
	props,
) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const id = createUniqueId();
	const location = useLocation();

	const [prev, setPrev] = createSignal(props.open);

	createEffect(() => {
		if (props.open) {
			if (searchParams[id]) {
				setPrev(true);
			} else {
				if (!prev()) {
					setSearchParams({ [id]: true });
				} else {
					props.setOpen(false);
					setPrev(false);
				}
			}
		} else {
			const url = new URL(window.location.href);
			const searchParamsString = url.searchParams.toString();
			if (searchParamsString.length > 10) {
				history.replaceState(null, "", "/");
			}
	
			setSearchParams({ [id]: null });
			setPrev(false);
		}
	});
	return <>{props.children}</>;
};

export default BackNav;
```
While it’s not perfect since it uses .length instead of counting uniqueIds for deeper menus. However it works well enough for this simple app.

Overall, the project was relatively straightforward to program. The only slightly tricky part was implementing the custom calendar, which required some effort. Most of my bugs were related to 0 evaluating as falsy. I’d hoped to catch on to this quickly, but it tripped me up several times.

In hindsight, I should have implemented a proper tagging system rather than the current tag-and-tag-group setup. Unfortunately, I realized this too late, so it’ll have to wait for a future update.

## Solidjs thoughts

Having already worked on another project using Solid Start, I was fairly familiar with its basics. One of SolidJS’s best aspects is how easily it integrates with vanilla JavaScript libraries. However, I did encounter a few minor annoyances:

#### Show type narrowing

```js
<Show when={solidQueryA.data && solidQueryB.data}>
{solidQueryA.data! && solidQueryB.data!}
</Show>
```

In the above example, type narrowing doesn’t work with TypeScript, so you always have to use the ! assertion, which is error-prone. While there’s a callback version of <Show>, I dislike renaming solidQueryA.data to something generic like data unnecessarily. Additionally, in this example, the callback version doesn’t work due to the AND condition in the when prop.

Similarly, I wish <For> components allowed using indices directly inside the callback without requiring variable renaming.

#### Other issues

- tRPC Errors: For some reason, I couldn’t prevent tRPC errors from crashing the server. This issue didn’t occur in my previous project, but with the latest dependencies, it surfaced. To work around this, I had to disable SSR.

- Environment Variables: Vinxi didn’t load .env files in production, so I resorted to this workaround:
```js
"start": "node --env-file=.env .output/server/index.mjs",
```
- Animations & Transitions: I couldn’t figure out how to use useTransition effectively for calendar animations. As a result, I switched to loading new data only after the exit animation completes, instead of starting it during the exit animation.

- Signals with Async Data: I struggled to initialize a signal with asynchronous data.

## Conclusion

Participating in Solid Hack 2024 was a fun experience. It’s a great way to introduce new users to SolidJS, and the ecosystem benefited from some excellent contributions through the challenges.




