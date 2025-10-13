<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const { form, enhance, message, errors } = superForm(data.form);
</script>

<form method="POST" use:enhance>
	<label for="password"> Enter password </label>
	<input id="password" name="password" bind:value={$form.password} />
	<button type="submit">Enter</button>
</form>
