<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const { form, enhance, message, errors } = superForm(data.form);
</script>

<main>
	<h1>Check for your invitation</h1>

	<form use:enhance method="POST">
		<div>
			<label for="email">Enter your email</label>
			<input name="email" id="email" bind:value={$form.email} required autocomplete="email" />
		</div>
		<button type="submit"> Submit </button>
	</form>
</main>
