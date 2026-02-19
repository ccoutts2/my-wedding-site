<script lang="ts">
	import type { Snippet } from 'svelte';

	interface PageLayoutProps {
		title?: string;
		children: Snippet;
		rootLayout?: 'app' | 'auth';
		pageLayout?: 'left' | 'centered';
	}

	let { title, children, rootLayout = 'app', pageLayout = 'left' }: PageLayoutProps = $props();
</script>

<main class="PageLayout" data-route-layout={rootLayout} data-page-layout={pageLayout}>
	{#if title}
		<h1>{title}</h1>
	{/if}

	{@render children?.()}
</main>

<style lang="scss">
	@use '$lib/styles/partials/variables';

	.PageLayout {
		background-color: variables.$color--background;
		color: variables.$color--foreground;
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
		padding: 1rem;

		h1 {
			color: variables.$color--foreground;
			padding-block: 2rem;
		}

		&[data-route-layout='auth'] {
			align-items: center;
			background-color: variables.$color--auth--background;
			justify-content: center !important;
			margin: 0 auto;
			min-height: 100dvh;

			h1 {
				color: variables.$color--auth--foreground;
			}
		}

		&[data-page-layout='centered'] {
			align-items: center;
			justify-content: flex-start;
			margin: 0 auto;

			h1 {
				text-align: center;
				text-wrap: pretty;
			}
		}
	}
</style>
