<script lang="ts">
	import '../app.css';
	import { setLocale, getLocale } from '$lib/paraglide/runtime';
	import { onMount } from 'svelte';

	const languages = [
		{ code: 'en', label: 'English' },
		{ code: 'ms', label: 'Bahasa' }
	];

	let activeLang = 'en';

	onMount(() => {
		activeLang = getLocale();
	});

	function changeLanguage(lang: string) {
		setLocale(lang);
		activeLang = lang;
	}

	function handleLangChange(event: Event) {
		const lang = (event.target as HTMLSelectElement).value;
		setLocale(lang);
		selectedLang = lang;
	}
</script>

<div class="lang-toggle">
	<select bind:value={activeLang} on:change={handleLangChange}>
		{#each languages as { code, label }}
			<option value={code}>{label}</option>
		{/each}
	</select>
</div>

<slot />
