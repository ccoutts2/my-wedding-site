<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { TableRow } from './types';

	interface TableRowProps {
		children: Snippet;
		type: TableRow;
	}

	let { children, type }: TableRowProps = $props();
</script>

<tr class="TableRow" data-is-type={type}> {@render children()}</tr>

<style lang="scss">
	@use '$lib/styles/partials/variables';

	.TableRow {
		opacity: (calc(var(--progress) * 8));

		&[data-is-type='header'] {
			background-color: variables.$color--button;
			color: variables.$color--button-text;
		}

		&[data-is-type='body'] {
			cursor: pointer;
			position: relative;
			transition: background-color 0.2s ease;

			&:hover {
				background-color: #e6dfe4;
			}

			:global(a::after) {
				content: '';
				inset: 0;
				position: absolute;
			}
		}
	}
</style>
