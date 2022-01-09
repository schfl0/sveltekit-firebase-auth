<script>
	import { auth } from '$lib/firebase';
	import { signInWithEmailAndPassword } from 'firebase/auth';

	export let toggleLogin;
	let email;
	let password;
	let errorMessage = null;

	const handleSubmit = async () => {
		try {
			/* Firebase login; will trigger onAuthStateChanged listener in firebase.js and
			if successfull redirect to dashboard */
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			errorMessage = error.message;
		}
	};
</script>

<form on:submit|preventDefault={handleSubmit} class="w-full">
	<div class="w-full mb-4 flex flex-col">
		<label for="email" class="mb-2">Email:</label>
		<input bind:value={email} on:input={() => (errorMessage = null)} type="text" name="email" />
	</div>
	<div class="w-full mb-5 flex flex-col">
		<label for="password" class="mb-2">Password:</label>
		<input
			bind:value={password}
			on:input={() => (errorMessage = null)}
			type="password"
			name="password"
		/>
	</div>
	{#if errorMessage !== null}
		<p class="mb-4 text-red-500">{errorMessage}</p>
	{/if}
	<div class="w-full flex flex-col">
		<button
			type="submit"
			class="mb-4 appearance-none px-4 py-2 rounded bg-blue-500 text-slate-50 outline-none hover:bg-blue-600"
			>Login</button
		>
		<p class=" text-center">
			Or <span on:click={toggleLogin} class="text-blue-500 underline cursor-pointer">register</span>
			to create new account.
		</p>
	</div>
</form>
