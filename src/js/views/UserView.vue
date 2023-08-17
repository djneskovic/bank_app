<template>
	<div class="container">
		<div class="user-view" v-if="user">
			<div
				class="user-view__welcome flex flex-col md:flex-row md:gap-32 justify-center items-center"
			>
				<h1>
					Hello <br />
					<span>
						{{ user.username }}
					</span>
				</h1>
				<p>
					Balance: <br />
					<span> {{ user.amount }}$ </span>
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
					>
						<p class="date">2022-2-22</p>
						<p class="amount">4444$</p>
					</li>
					<li
						class="transactions-list__item flex justify-around items-center"
					>
						<p class="date">2022-2-22</p>
						<p class="amount">4444$</p>
					</li>
					<li
						class="transactions-list__item flex justify-around items-center"
					>
						<p class="date">2022-2-22</p>
						<p class="amount">4444$</p>
					</li>
					<li
						class="transactions-list__item flex justify-around items-center"
					>
						<p class="date">2022-2-22</p>
						<p class="amount">4444$</p>
					</li>
					<li
						class="transactions-list__item flex justify-around items-center"
					>
						<p class="date">2022-2-22</p>
						<p class="amount">4444$</p>
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

import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const user = ref(null);
const { params } = useRoute(); // Import useRoute from 'vue-router'
const router = useRouter();

function logout() {
	user.value = null;

	router.replace("/login");
}

onMounted(() => {
	const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

	const matchedUser = storedUsers.find(
		(user) => user.username === params.username
	);

	if (matchedUser) {
		user.value = matchedUser;
	}
});
</script>
