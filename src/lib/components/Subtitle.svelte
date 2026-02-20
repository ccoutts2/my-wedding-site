<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Heading } from '$lib/types';

	let { children, as }: { children: Snippet; as: Heading } = $props();
</script>

<svelte:element this={as} class="Subtitle">
	{@render children()}
</svelte:element>

<style lang="scss">
	.Subtitle {
		float: left;
		font-size: 1rem;
		font-style: normal;
		font-weight: 400;
		font-weight: 500;
		line-height: 1.2rem;
		margin-block: 0.5rem 0.825rem;
		min-width: 35%;
		padding-left: 1.1rem;
		position: relative;
		text-transform: uppercase;

		&::before {
			content: '';
			background-color: currentColor;
			border-radius: 50%;
			display: inline-block;
			height: 11px;
			left: 0;
			position: absolute;
			top: calc(50% - 6.5px);
			width: 11px;
		}
	}
</style>
