<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageProps } from './$types';
	import PageLayout from '$lib/components/PageLayout.svelte';

	let { data }: PageProps = $props();

	let isPasswordVisible: boolean = $state(false);

	const { form, enhance, message, errors } = superForm(data.form);

	const showPassword = () => {
		isPasswordVisible = !isPasswordVisible;
	};
</script>

<PageLayout layout="auth">
	<form method="POST" use:enhance>
		<div>
			<label for="password"> Enter password </label>
			<input
				type={isPasswordVisible ? 'text' : 'password'}
				id="password"
				name="password"
				bind:value={$form.password}
				required
			/>
			<button type="button" onclick={showPassword}>Reveal</button>
		</div>

		<button type="submit">Enter</button>
	</form>
</PageLayout>
