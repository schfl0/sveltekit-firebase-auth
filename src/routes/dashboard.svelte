<script>
	import { auth } from '$lib/firebase';
	import { signOut } from 'firebase/auth';
	import { userStore } from '$lib/userStore';

	let errorMessage = null;

	const handleLogout = async () => {
		try {
			/* Firebase logout; will trigger onAuthStateChanged listener in firebase.js and if successfull redirect to login page */
			await signOut(auth);
		} catch (error) {
			errorMessage = error.Message;
			console.log(errorMessage);
		}
	};
	// Reactive helper variables to check userStore if authKnown is true and current user is set
	$: authKnown = $userStore.authKnown;
	$: currentUser = $userStore.user;
</script>

{#if !authKnown}
	<!-- To avoid screen flickering, show empty page until auth status is known and authKnown in userStore is set to true -->
	<div />
{:else if currentUser !== null}
	<h2 class="text-4xl">Dashboard</h2>
	<p class="my-4">{JSON.stringify($userStore.user)}</p>
	<button
		class="mb-4 appearance-none px-4 py-2 rounded bg-red-500 text-slate-50 outline-none hover:bg-red-600"
		on:click={handleLogout}>Logout</button
	>
{:else}
	<div>Redirecting...</div>
{/if}
