import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { userStore } from '$lib/userStore';
import { browser } from '$app/env';
import { goto } from '$app/navigation';

const firebaseConfig = {
	// Include firebase configuration details
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

if (browser) {
	// Listen for auth changes in browser and handle redirects
	onAuthStateChanged(auth, (authUser) => {
		if (authUser) {
			// If there is a current user, set to userStore, set authKnown true and redirect to dashboard
			userStore.set({ user: authUser, authKnown: true });
			console.log(userStore);
			goto('/dashboard');
		} else {
			// If there is no user, set user in userStore to null and redirect to login page
			userStore.set({ user: null, authKnown: true });
			goto('/');
		}
	});
} else {
	// Do nothing on server...
	console.log('Ran on server');
}
