<script lang="ts">
	import { getContext } from 'svelte';
	import type { OverlayProps } from '$lib/types';
	import GridItem from './ui/GridItem.svelte';
	import { assetsConfig } from '$lib/config/assets';
	import NavLink from './navigation/NavLink.svelte';
	import TextColumn from './TextColumn.svelte';
	import Subtitle from './Subtitle.svelte';
	import Section from './Section.svelte';

	const context = getContext<OverlayProps>('overlay-ctx') ?? { isMenuOpen: false };

	let { data }: { data: { adminUser: boolean; page: string; user: any } } = $props();

	const url = $derived(data.page);
	const user = data?.user;

	$effect(() => {
		if (url) {
			context.isMenuOpen = false;
		}
	});
</script>

<div class="Overlay {context.isMenuOpen ? 'menu-open' : ''}">
	<div class="Overlay__content">
		<div class="Overlay__textColumn">
			<nav>
				<ul>
					<li class="Overlay__navItem">
						<NavLink
							href="/our-story"
							aria-current={url === '/our-story'}
							active={url === '/our-story'}>Our Story</NavLink
						>
					</li>
					<li class="Overlay__navItem">
						<NavLink href="/rsvp" aria-current={url === '/rsvp'} active={url === '/rsvp'}
							>RSVP</NavLink
						>
					</li>
					<li class="Overlay__navItem">
						<NavLink href="/q&a" aria-current={url === '/q&a'} active={url === '/q&a'}
							>Q & A</NavLink
						>
					</li>
				</ul>
			</nav>

			{#if user}
				<section class="flex-col">
					<Subtitle as="h3"
						>You are {user.isAccepted ? 'coming' : 'not coming'}, {user.givenName}</Subtitle
					>
					{#if user.isAccepted}
						<article class="Overlay__response">
							<p>Your responses:</p>
							<ul>
								<li>Diet: {user.diet.toLowerCase()}</li>
								<li>Allergies: {user.hasAllergies ? 'Yes' : 'No'}</li>
								<li>Music Choice: {user.musicSelection}</li>
							</ul>
						</article>
					{:else}
						<p class="Overlay__response">Not too late to <a href="/rsvp">change your mind</a>.</p>
					{/if}
				</section>
			{/if}
		</div>

		<GridItem
			src={assetsConfig[29].src}
			alt={assetsConfig[29].alt}
			width={assetsConfig[29].width}
			height={assetsConfig[29].height}
			col={2}
			span={4}
		/>
	</div>
</div>

<style lang="scss">
	@use '$lib/styles/partials/breakpoints';

	.Overlay {
		background-color: #e6c2bf;
		clip-path: inset(0% 0% 100% 0%);
		height: 100dvh;
		left: 0;
		position: fixed;
		top: 0;
		transition: clip-path 0.65s cubic-bezier(0.09, 0.75, 0.47, 1.01);
		width: 100vw;

		&.menu-open {
			clip-path: inset(0% 0% 0% 0%);
		}

		&__content {
			display: flex;
			flex-direction: column;
			gap: 2rem;
			height: 100%;
			margin: 0 auto;
			padding: 3rem 2rem 1rem;
			width: 100%;

			@include breakpoints.tablet {
				grid-template-rows: auto;
				display: grid;
				padding: 0;
				grid-template-columns: repeat(12, 1fr);
				place-content: center;
			}
		}

		&__textColumn {
			display: flex;
			flex-direction: column;
			grid-column: 2 / 12;
			grid-row: 1;
			height: 100%;
			justify-content: center;
			width: 100%;

			@include breakpoints.tablet {
				grid-column: 7 / 13;
				justify-content: space-between;
			}
		}

		&__navItem {
			font-size: clamp(1.5rem, 4vw, 4rem);
			list-style: none;
			margin-block: 1rem;
		}

		&__response {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			li {
				list-style: none;
				text-transform: capitalize;
			}
		}
	}
</style>
