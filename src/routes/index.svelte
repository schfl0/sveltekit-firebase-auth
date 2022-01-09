<script>
	import LoginForm from '$lib/LoginForm.svelte';
	import RegisterForm from '$lib/RegisterForm.svelte';
	import { userStore } from '$lib/userStore';

	let showLogin = true;
	const toggleLogin = () => {
		showLogin = !showLogin;
	};
	// Reactive helper variables to check userStore if authKnown is true and current user is set
	$: authKnown = $userStore.authKnown;
	$: currentUser = $userStore.user;
</script>

{#if !authKnown}
	<!-- To avoid screen flickering on redirect/reload, show empty page until auth status is known and authKnown in
	userStore set to true -->
	<div />
{:else if currentUser === null}
	<div class="h-screen w-full flex justify-center items-center">
		<div class="w-full max-w-lg p-6 border border-slate-300 rounded-md shadow-md">
			{#if showLogin}
				<h2 class="mb-2 text-4xl font-bold text-center">Login</h2>
				<LoginForm {toggleLogin} />
			{:else}
				<h2 class="mb-2 text-4xl font-bold text-center">Register</h2>
				<RegisterForm {toggleLogin} />
			{/if}
		</div>
	</div>
{:else}
	<div>Redirecting...</div>
{/if}
