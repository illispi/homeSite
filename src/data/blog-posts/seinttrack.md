---
title: Thoughts after doing solid hack 2024
publishDate: 18 november 2024
description: post mortem
---

![Web app img](/assets/blog/SeinTrack/seintrack.png)

## Intro

Link to project demo: [SeinTrack](https://demoseintrack.delvis.org/)

Point of the project SeinTrack is that you can set how many hours you want to work on whatever project you have, and try to be consistent with it by setting target hours for a day and logging them in them into the app and build a streak. Its intended to be self-hosted behind auth proxy.

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

Lot of my bugs were related to 0 evaluating as falsy. You would think I would have learned from it quickly, but it tripped me quite often.

I should have probably done proper tag system and not the current tag and tag group system, but I realized this too late, so it will have to be done after project

## Solidjs thoughts

I had already done other project in Solid start, so I was quite familiar with it on basics level. One of the best things is that is easy to work with vanilla js libraries. But here are some minor annoyances I had with solid start.

#### Show type narrowing

```js
<Show when={solidQueryA.data && solidQueryB.data}>
{solidQueryA.data! && solidQueryB.data!}
</Show>
```

Above type narrowing doesnt work for typescript, so you always have to use ! assertion, which kind of error prone. There is a callback version of `<Show>`, but I dont like renaming solidQueryA.data to data for no reason, and in this example it doesnt even work since there is AND condition in when. I also kind of wish you could do `<For>` component as well without renaming variable and just use index inside callback.

#### Other issues

I couldnt get trpc errors not crash the server for some reason, it didnt happen on my previous project at some point but on latest dependencies, it happens, so I had to disable SSR. For some reason vinxi doesnt seem to load .env in production, so I had to use this workaround 
```js
"start": "node --env-file=.env .output/server/index.mjs",
```
On programming side I couldnt figure out how to work with useTransition for calendar animation, so I just switch to new data after exit animation, instead of starting to load new async data immediately after exit animation starts. I couldnt figure out how to initialize signal with async data either.


## Conclusion

I think it was pretty fun to participate in this hack, and I think its good way to get new users to try solidjs and ecosystem got some good contributions from challenges.


