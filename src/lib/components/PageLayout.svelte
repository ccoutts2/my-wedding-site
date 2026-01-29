<script lang="ts">
	import type { Snippet } from 'svelte';

	interface PageLayoutProps {
		title?: string;
		children: Snippet;
		layout?: 'default' | 'auth';
	}

	let { title, children, layout = 'default' }: PageLayoutProps = $props();
</script>

<main class="PageLayout" data-layout={layout}>
	{#if title}
		<h1>{title}</h1>
	{/if}

	{@render children?.()}
</main>

<style lang="scss">
	@use '$lib/styles/partials/variables';

	.PageLayout {
		background-color: variables.$color--background;
		color: variables.$color--text;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		padding: 1rem;

		h1 {
			color: variables.$color--foreground;
		}

		&[data-layout='auth'] {
			align-items: center;
			background-color: variables.$color--auth--background;

			justify-content: center;

			h1 {
				color: variables.$color--auth--foreground;
			}
		}
	}
</style>
