<template>
	<main id="signUp">
		<div class="signUp" v-if="authStore.signUpWindow">
			<div
				class="overlay animate__animated animate__fadeIn animate__faster"
			>
				<div
					class="sign-up_content flex flex-col items-center justify-center"
				>
					<h1 class="mb-8">Please Sign Up to continue</h1>

					<input
						type="text"
						placeholder="Enter your e-mail"
						required
						v-model="authStore.email"
					/>
					<input
						type="text"
						placeholder="Enter your password"
						required
						v-model="authStore.password"
					/>
					<input
						type="text"
						placeholder="Enter your username"
						required
						v-model="authStore.username"
					/>
					<input
						type="number"
						placeholder="Enter your amount"
						required
						v-model="authStore.amount"
					/>
					<p v-if="authStore.errorMsg">
						Something went wrong, please check your inputs!
					</p>
					<p v-if="authStore.userExist">
						Sorry, User already exist.
					</p>
					<button class="btn mt-4" @click="signUp()">
						Sign Up
					</button>
				</div>
			</div>
		</div>
		<p
			class="successfull animate__animated animate__backInUp animate__faster"
			v-if="authStore.successfull"
		>
			Sign up was successfull! <br />
			You can now sign in.
		</p>
	</main>
</template>

<script setup>
import { useAuthStore } from "../../stores/AuthStore";
import { onMounted } from "vue";

const authStore = useAuthStore();

function signUp() {
	authStore.signUp();
}

onMounted(() => {
	authStore.initializeUsers();
});
</script>
