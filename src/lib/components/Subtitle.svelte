<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Heading } from '$lib/types';

	let { children, as }: { children: Snippet; as: Heading } = $props();
</script>

<header class="Subtitle">
	<svelte:element this={as} class="Subtitle__heading">
		{@render children()}
	</svelte:element>
</header>

<style lang="scss">
	.Subtitle {
		text-transform: uppercase;
		font-style: normal;
		font-weight: 400;
		line-height: 1.2rem;
		float: left;
		min-width: 35%;
		margin-block: 0.5rem 0.825rem;

		&__heading {
			position: relative;
			padding-left: 1.1rem;

			&::before {
				content: '';
				background-color: #181818;
				border-radius: 50%;
				display: inline-block;
				height: 0.75rem;
				left: 0;
				position: absolute;
				top: calc(50% - 6.5px);
				width: 0.75rem;
			}
		}
	}
</style>
