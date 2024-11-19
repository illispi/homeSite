export interface TransitionAnimation {
	name: string; // The name of the keyframe
	delay?: number | string;
	duration?: number | string;
	easing?: string;
	fillMode?: string;
	direction?: string;
}

export interface TransitionAnimationPair {
	old: TransitionAnimation | TransitionAnimation[];
	new: TransitionAnimation | TransitionAnimation[];
}

export interface TransitionDirectionalAnimations {
	forwards: TransitionAnimationPair;
	backwards: TransitionAnimationPair;
}

const anim: TransitionAnimationPair = {
	old: {
		name: "slideOutFade",
		duration: "0.3s",
		easing: "ease-in",
		fillMode: "both",
	},
	new: {
		name: "slideInFade",
		delay: "0.3s",
		duration: "0.3s",
		easing: "ease-out",
		fillMode: "both",
	},
};

export const slideFade = {
	forwards: anim,
	backwards: anim,
};
