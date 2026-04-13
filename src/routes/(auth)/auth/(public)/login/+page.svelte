<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageProps } from './$types';
	import PageLayout from '$lib/components/PageLayout.svelte';
	import Form from '$lib/components/form/Form.svelte';
	import InputField from '$lib/components/form/InputField.svelte';
	import { Eye, EyeOff } from '@lucide/svelte';

	let { data }: PageProps = $props();

	let isPasswordVisible: boolean = $state(false);

	const { form, enhance, errors } = superForm(data.form);

	const showPassword = () => {
		isPasswordVisible = !isPasswordVisible;
	};
</script>

<svelte:head>
	<title>Aly and Chris | Log in</title>
	<meta name="description" content="Log in to access the wedding portal site." />
</svelte:head>

<PageLayout rootLayout="auth" title="Welcome to our wedding site!" pageLayout="centered">
	<Form {enhance}>
		<div class="Login">
			<InputField
				label="Enter the password"
				fieldName="password"
				type={isPasswordVisible ? 'text' : 'password'}
				bind:value={$form.password}
				errors={$errors?._errors}
				required
			/>

			<div>
				<button class="Login__button" type="button" onclick={showPassword}>
					<span>
						{#if isPasswordVisible}
							<EyeOff size={20} />
						{:else}
							<Eye size={20} />
						{/if}
					</span>
					<span class="visually-hidden"
						>{isPasswordVisible ? 'Hide password' : 'Show password'}</span
					>
				</button>
			</div>
		</div>
	</Form>
</PageLayout>

<style lang="scss">
	.Login {
		align-items: center;
		justify-content: center;
		display: flex;
		width: 100%;

		&__button {
			padding-inline: 1rem;
			position: relative;

			span:first-of-type {
				position: absolute;
			}
		}
	}
</style>
