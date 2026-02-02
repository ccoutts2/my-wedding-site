<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import Form from '$lib/components/form/Form.svelte';
	import InputField from '$lib/components/form/InputField.svelte';
	import PageLayout from '$lib/components/PageLayout.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const { form, enhance, errors } = superForm(data.form);
</script>

<svelte:head>
	<title>Aly and Chris | Check Invitation</title>
	<meta name="description" content="Check for your wedding invitation by filling in the form." />
</svelte:head>

<PageLayout rootLayout="auth" title="Check for your invitation!" pageLayout="centered">
	<Form {enhance}>
		<InputField
			type="email"
			fieldName="email"
			label="Enter your email"
			autocomplete="email"
			bind:value={$form.email}
			errors={$errors.email}
			required
		/>
	</Form>
</PageLayout>
