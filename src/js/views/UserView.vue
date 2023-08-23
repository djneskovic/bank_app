<template>
	<div class="container">
		<div class="user-view" v-if="authStore.user">
			<div
				class="user-view__welcome flex flex-col md:flex-row md:gap-32 justify-center items-center"
			>
				<h1>
					Hello <br />
					<span>
						{{ authStore.user.username }}
					</span>
				</h1>
				<p>
					Balance: <br />
					<span> {{ authStore.user.amount }}$ </span>
				</p>
				<button class="btn btn-logout" @click="logout()">
					Log out
				</button>
			</div>

			<!-- Payment -->
			<PaymentComponent />

			<!-- Transactions -->
			<div class="transactions">
				<h2>Last Transactions</h2>
				<ul class="transactions-list">
					<li
						class="transactions-list__item flex justify-around items-center"
						v-for="transaction in authStore.user.transaction"
						:key="transaction"
					>
						<p>{{ transaction.datetime }}</p>
						<p>{{ transaction.amount }}$</p>

						<!-- POGLEDAJ DOBRO -->
					</li>
				</ul>
			</div>
		</div>

		<!-- <div v-else>
			<p>Loading...</p>
		</div> -->
	</div>
</template>

<script setup>
import PaymentComponent from "../components/PaymentComponent.vue";

import { useAuthStore } from "../../stores/AuthStore";

import { onMounted } from "vue";
import { useRoute } from "vue-router";

const { params } = useRoute();

const authStore = useAuthStore();

function logout() {
	authStore.logout();
}

function loadUserInfo() {
	const username = params.username;
	authStore.getUserInfo(username);
}

onMounted(() => {
	loadUserInfo();
});
</script>
