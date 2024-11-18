---
title: Thoughts after doing solid hack 2024
publishDate: 18 november 2024
description: post mortem
---

![Web app img](/assets/blog/SeinTrack/seintrack.png)

## Intro

Link to project demo: [SeinTrack](https://demoseintrack.delvis.org/)

Point of the project SeinTrack is that you can set how many hours you want to work on whatever project you have, and try to be consistent with it by setting target hours for a day and logging them in them into the app and build a streak.

It is built as a submission for Solid hack 2024 and voting is ongoing right now.

## Features

One of the nice things I implemented with this project is closing menus with back navigate gesture on mobile. Usually web sites don't handle this and you have to close menus by clicking X or away from menu area. Doing back gesture just takes you you to previous page typically. Enabling back gesture just makes it feel more like a native app. My implementation is done with just simple search params like this:

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

Its not perfect since it uses .length and not counting uniqueId:s for deeper menus, but for my simple app it was fine.

Whole project was fairly simple to program, only slighly tricky part was the main calendar, since it's custom implementation.

I should have probably done proper tag system and not the current tag and tag group system, but I realized this too late, so it will have to be done after project
