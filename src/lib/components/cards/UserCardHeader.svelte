<script lang="ts">
	import { enhance } from '$app/forms';
	import { Pencil, Trash } from '@lucide/svelte';

	let {
		action,
		givenName,
		familyName,
		name,
		id
	}: { action: string; name: string; givenName: string; familyName: string; id: string | number } =
		$props();
</script>

<header class="UserCardHeader">
	<h3>
		{givenName}
		{familyName}
	</h3>
	<menu class="UserCardHeader__buttons">
		<li>
			<form use:enhance method="POST" {action} data-sveltekit-reload>
				<input type="hidden" {name} value={id} />
				<button
					type="submit"
					onclick={(e) =>
						!confirm(`Are you sure you want to delete ${givenName} ${familyName}?`) &&
						e.preventDefault()}><Trash /></button
				>
			</form>
		</li>
		<li>
			<a href="/admin/view-guests/{id}/edit"><Pencil /></a>
		</li>
	</menu>
</header>

<style lang="scss">
	.UserCardHeader {
		align-items: center;
		display: flex;
		gap: 3rem;
		justify-content: space-between;

		&__buttons {
			display: flex;
			gap: 0.5rem;

			button {
				background-color: inherit;
			}

			a {
				color: inherit;
			}
		}
	}
</style>
