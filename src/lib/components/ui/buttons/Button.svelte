<script lang="ts">
	import type { Snippet } from 'svelte';

	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface ButtonProps extends HTMLButtonAttributes {
		children: Snippet;
	}

	let { children, ...props }: ButtonProps = $props();
</script>

<button class="Button" {...props}>
	{@render children?.()}
</button>

<style lang="scss">
	@use '$lib/styles/partials/breakpoints';
	@use '$lib/styles/partials/variables';

	.Button {
		align-items: center;
		background-color: variables.$color--button;
		color: variables.$color--button-text;
		display: flex;
		border-radius: 4px;
		flex: 1;
		justify-content: center;
		width: 100%;

		min-width: 5rem;
		overflow: hidden;
		padding: 0.5rem;
		position: relative;
		box-shadow: 0px;
		transition: box-shadow 0.3s;

		&:hover {
			box-shadow: 0px 1px 2px dimgray;
		}

		@include breakpoints.tablet {
			max-width: 12.5rem;
		}
	}
</style>
