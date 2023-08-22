<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data: PageData;
	const { form, errors, constraints, enhance } = superForm(data.form);
</script>

<SuperDebug data={$form} />

<form method="POST" use:enhance>
	<div>
		<label for="name">Name</label>
		<input
			type="text"
			name="name"
			aria-invalid={$errors.name ? 'true' : undefined}
			bind:value={$form.name}
			{...$constraints.name}
		/>
		{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}
	</div>

	<div>
		<label for="email">E-mail</label>
		<input
			type="email"
			name="email"
			aria-invalid={$errors.email ? 'true' : undefined}
			bind:value={$form.email}
			{...$constraints.email}
		/>
		{#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}
	</div>

	<!--
  Add maxlength manually?
  -> superforms not the source of truth
  -->
	<!-- <div>
		<label for="bio">Bio</label>
		<textarea
			name="bio"
			cols="30"
			rows="10"
			aria-invalid={$errors.bio ? 'true' : undefined}
			bind:value={$form.bio}
			{...$constraints.bio}
			maxlength="5"
		/>
    <span>{$form.bio.length}/{$constraints.bio?.maxlength}</span>
		{#if $errors.bio}<span class="invalid">{$errors.bio}</span>{/if}
	</div> -->
	<div>
		<label for="bio">Bio</label>
		<textarea
			name="bio"
			cols="30"
			rows="10"
			aria-invalid={$errors.bio ? 'true' : undefined}
			bind:value={$form.bio}
			{...$constraints.bio}
		/>
		<span>{$form.bio.length}/{$constraints.bio?.maxlength}</span>
		{#if $errors.bio}<span class="invalid">{$errors.bio}</span>{/if}
	</div>

	<div><button>Submit</button></div>
</form>

<style>
	label {
		display: block;
	}
	.invalid {
		color: red;
	}
</style>
