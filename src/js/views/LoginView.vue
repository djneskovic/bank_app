<template>
	<main id="login">
		<div class="container">
			<div class="login flex flex-col items-center justify-center">
				<div class="login-logo">
					<img src="/images/logo2.png" alt="" />
				</div>
				<div class="inputs">
					<input
						type="text"
						placeholder="Email"
						required
						v-model="authStore.email"
					/>
					<input
						type="text"
						placeholder="Password"
						required
						v-model="authStore.password"
					/>
				</div>
				<p class="signInError" v-if="authStore.signInError">
					Something went wrong. Please check your inputs.
				</p>
				<button class="btn btn-signIn" @click="signIn()">
					Sign In
				</button>

				<p class="or">or</p>
				<button
					class="btn btn-signUp"
					@click="authStore.openSignUpWindow()"
				>
					Sign Up
				</button>
			</div>
		</div>
		<div>
			<SignUp />
		</div>
	</main>
</template>

<script setup>
import SignUp from "../components/SignUp.vue";

import { useAuthStore } from "../../stores/AuthStore";

const authStore = useAuthStore();

function signIn() {
	authStore.signIn();
}
</script>
