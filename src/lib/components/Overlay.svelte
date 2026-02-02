<script lang="ts">
	import { getContext } from 'svelte';
	import type { OverlayProps } from '$lib/types';

	const context = getContext<OverlayProps>('overlay-ctx') ?? { isMenuOpen: false };
</script>

<div class="Overlay {context.isMenuOpen ? 'menu-open' : ''}">Hi</div>

<style lang="scss">
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
	}
</style>
