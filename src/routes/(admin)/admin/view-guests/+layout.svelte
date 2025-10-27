<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import type { EventHandler } from 'svelte/elements';
	import Table from '$lib/components/Table.svelte';
	import SearchInput from '$lib/components/form/SearchInput.svelte';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();

	let timeout: number | NodeJS.Timeout;

	const DEBOUNCE_TIME_IN_MS: number = 400;

	let searchTerm: string = $state(data.query ?? '');

	const sorting: {
		orderBy: string;
		ascending: boolean;
	} = $derived(data.sorting);

	// Func to search for results upon input change, with debounce

	const handleInput: EventHandler<Event, HTMLInputElement> = ({ currentTarget }) => {
		clearTimeout(timeout);
		const form = currentTarget?.form;

		if (!form) {
			return;
		}

		timeout = setTimeout(() => {
			form.requestSubmit();
		}, DEBOUNCE_TIME_IN_MS);
	};

	const isModalOpen = $derived(
		page.route.id === '/(admin)/admin/view-guests/[id]' ||
			page.route.id === '/(admin)/admin/view-guests/[id]/edit'
	);
</script>

<main class="ViewGuestsLayout {isModalOpen ? 'show-modal' : ''}">
	<SearchInput {searchTerm} {handleInput} />

	{#if data.users}
		<Table users={data.users} {sorting} {searchTerm} {handleInput} />
	{/if}

	{@render children?.()}
</main>

<style lang="scss">
	.ViewGuestsLayout {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 1rem;
		position: relative;

		&.show-modal {
			overflow: hidden;

			:global(.ViewGuests) {
				overflow: hidden;
				pointer-events: none;
			}
		}

		&.show-modal::after {
			content: '';
			background: rgba(0, 0, 0, 0.2);
			inset: 0;
			position: fixed;
			z-index: -5;
		}
	}
</style>
