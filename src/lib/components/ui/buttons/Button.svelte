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
		border-radius: 4px;
		box-shadow: none;
		color: variables.$color--button-text;
		display: flex;
		flex: 1;
		justify-content: center;
		min-width: 5rem;
		padding: 0.5rem;
		transition: box-shadow 0.3s;
		width: 100%;

		&:hover {
			box-shadow: 0px 1px 2px dimgray;
		}

		@include breakpoints.tablet {
			max-width: 12.5rem;
		}
	}
</style>
