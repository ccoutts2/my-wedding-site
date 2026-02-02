<script lang="ts">
	import type { Sorting } from '$lib/types';
	import { MoveUp } from '@lucide/svelte';

	interface TableFilterProps {
		searchTerm: string;
		label: string;
		value: string;
		sorting: Sorting;
	}

	let { searchTerm = $bindable(), label, value, sorting }: TableFilterProps = $props();
</script>

<form>
	<input type="hidden" name="q" bind:value={searchTerm} />
	<input type="hidden" name="orderBy" {value} />
	<input type="hidden" name="asc" value={sorting.ascending ? 'false' : 'true'} />
	<button type="submit" class="TableFilter__button">
		<span>{label}</span>
		{#if sorting.orderBy === value}
			<span class="TableFilter__orderBy {sorting.ascending ? 'ascending' : 'descending'}"
				><MoveUp /></span
			>
		{/if}
	</button>
</form>

<style lang="scss">
	.TableFilter {
		&__button {
			align-items: center;
			border: none;
			display: flex;
			font-weight: 700;
			gap: 0.5rem;
			transition: opacity 0.2s ease;
			position: relative;

			&:hover {
				opacity: 0.8;
			}
		}

		&__orderBy {
			scale: 0.6;
			transition: rotate 0.3s cubic-bezier(0.86, 0, 0.07, 1);
			position: absolute;
			left: 100%;

			&.ascending {
				rotate: 0deg;
			}

			&.descending {
				rotate: 180deg;
			}
		}
	}
</style>
