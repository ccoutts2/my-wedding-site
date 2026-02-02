<script lang="ts">
	import { getContext } from 'svelte';
	import type { OverlayProps } from '$lib/types';

	const context = getContext<OverlayProps>('overlay-ctx');
	if (!context) {
		throw new Error('BurgerButton component must be used within an overlay context provider');
	}

	const toggleBurgerMenu = () => {
		context.isMenuOpen = !context.isMenuOpen;
	};
</script>

<button class="BurgerButton" data-is-open={context.isMenuOpen} onclick={toggleBurgerMenu}>
	<span>{context.isMenuOpen ? 'close' : 'menu'}</span>
	<span class="BurgerButton__burger">
		<span><span class="visually-hidden">Toggle menu.</span></span>
	</span>
</button>

<style lang="scss">
	@use '$lib/styles/partials/breakpoints';
	@use '$lib/styles/partials/variables';

	.BurgerButton {
		display: flex;
		justify-content: flex-end;
		gap: 2rem;
		min-width: 12.5rem;
		position: relative;
		transition: background-color 0.3s ease;
		z-index: 1000;
		view-transition-name: button;

		@include breakpoints.tablet {
			padding: 1rem 2rem;
		}

		&::before {
			content: '';
			background-color: variables.$color--button;
			inset: 0;
			position: absolute;
			transform-origin: bottom;
			transform: scaleY(0);
			transition: transform 0.25s ease-in-out;
			z-index: -1;
		}

		&[data-is-open='true'] &__burger {
			span:first-of-type {
				scale: 1 1 !important;
			}
		}

		&__burger {
			align-items: center;
			contain: paint;
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			justify-content: center;
			position: relative;
			right: 0;
			width: 4rem;
			z-index: 100;

			span:first-of-type,
			&::before,
			&::after {
				background-color: black;
				color: transparent;
				display: block;
				font-size: 0;
				height: 1px;
				transform: scale(1);
				width: 100%;
			}

			&::before,
			&::after {
				content: '';
				transition: translate 0.3s ease;
				translate: 0 0;
			}

			span:first-of-type {
				scale: 1 1;
				transition: scale 0.3s ease;
				width: 100%;
				z-index: 2;
			}
		}

		&:hover::before {
			transform: scaleY(1);
		}

		&:hover &__burger {
			&::before {
				translate: -100% 0;
			}

			&::after {
				translate: 100% 0;
			}

			span:first-of-type {
				scale: 1 1;
			}
		}

		&[data-is-open='true'] &__burger {
			&::before {
				translate: -100% 0;
			}

			&::after {
				translate: 100% 0;
			}

			span:first-of-type {
				scale: 0.5 1;
			}
		}

		&:active &__burger {
			span:first-of-type {
				scale: 0.1 1 !important;
			}
		}
	}
</style>
