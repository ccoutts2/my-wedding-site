<script lang="ts">
	import { getPreloaderState } from '$lib/contexts/preloader.state.svelte';
	import { getContext, onMount } from 'svelte';
	import BurgerButton from '../ui/buttons/BurgerButton.svelte';
	import NavLink from '../navigation/NavLink.svelte';
	import type { OverlayProps } from '$lib/types';

	interface HeaderProps {
		adminUser: boolean;

		url: string;
	}

	let { adminUser, url }: HeaderProps = $props();

	const timelineState = getPreloaderState();
	const overlayContext = getContext<OverlayProps>('overlay-ctx') ?? { isMenuOpen: false };

	let header: HTMLHeadElement;

	onMount(() => {
		if (timelineState.isInitialLoad && timelineState.tl) {
			timelineState.tl
				.from(
					header,
					{
						yPercent: -100,
						duration: 1.5,
						ease: 'power4.out'
					},
					'header'
				)
				.add('hero', '-=2');
		}

		return () => {
			timelineState.tl?.kill();
		};
	});
</script>

<header class="Header" bind:this={header}>
	<nav>
		{#if adminUser}
			<ul class="Header__navList" class:hidden={overlayContext.isMenuOpen}>
				<li>
					<NavLink
						href="/admin/add-guests"
						aria-current={url === '/admin/add-guests'}
						active={url === '/admin/add-guests'}
						>Add Guests
					</NavLink>
				</li>

				<li>
					<NavLink
						href="/admin/view-guests"
						aria-current={url === '/admin/view-guests'}
						active={url === '/admin/view-guests'}
						>View Guests
					</NavLink>
				</li>
			</ul>
		{:else}
			<span class:hidden={overlayContext.isMenuOpen}>
				<NavLink href="/rsvp" aria-current={url === '/rsvp'} active={url === '/rsvp'}>RSVP</NavLink>
			</span>
		{/if}
	</nav>

	<BurgerButton />
</header>

<style lang="scss">
	.Header {
		align-items: baseline;
		display: flex;
		gap: 2rem;
		justify-content: space-between;
		padding: 1rem;
		position: relative;
		z-index: 100;

		&__navList {
			align-items: center;
			display: flex;
			gap: 1rem;
			list-style: none;
			view-transition-name: header;

			&.hidden {
				opacity: 0;
				pointer-events: none;
			}
		}
	}
</style>
