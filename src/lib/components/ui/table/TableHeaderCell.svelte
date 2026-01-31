<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Scope } from './types';

	interface TableHeaderCellProps {
		scope: Scope;
		children: Snippet;
		filter?: boolean;
	}

	let { scope, children, filter = false }: TableHeaderCellProps = $props();
</script>

<th class="TableHeaderCell" {scope} data-is-filtered={filter}>
	{@render children()}
</th>

<style lang="scss">
	.TableHeaderCell[scope='col'] {
		font-weight: 500;
		font-size: 0.875rem;
		padding: 1rem 1.5rem;
		text-align: left;

		&[data-is-filtered='true'] {
			font-weight: 600;
		}
	}

	.TableHeaderCell[scope='row'] {
		color: #1a1a1a;
		font-size: 0.875rem;
		font-weight: 400;
		padding: 1rem 1.5rem;
		text-align: left;
	}
</style>
