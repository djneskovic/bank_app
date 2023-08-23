<template>
	<div class="payments">
		<div class="transfer">
			<h2>Transfer Money</h2>
			<div
				class="transfer-inputs md:flex md:items-center md:justify-center md:gap-4"
			>
				<input type="text" placeholder="Enter username" />
				<input type="number" placeholder="Amount" />
			</div>
			<button class="btn">Send</button>
		</div>
		<div class="loan">
			<h2>Loan</h2>
			<div class="transfer-inputs">
				<input
					type="number"
					placeholder="Amount"
					v-model="authStore.loanAmount"
				/>
			</div>
			<button class="btn" @click="loanMoney()">Loan</button>
		</div>
		<div class="delete">
			<h2>Delete Account</h2>
			<div
				class="transfer-inputs md:flex md:items-center md:justify-center md:gap-4"
			>
				<input
					type="text"
					placeholder="Enter email"
					v-model="authStore.email"
				/>
				<input
					type="password"
					placeholder="Enter password"
					v-model="authStore.password"
				/>
			</div>
			<p class="my-4" v-if="authStore.errorMsg">
				Something went wrong <br />
				check your data!
			</p>
			<button class="btn" @click="deleteAccount()">Delete</button>
		</div>
	</div>
	<p
		class="loanMessage animate__animated animate__backInUp animate__faster"
		v-if="authStore.loanMessage"
	>
		Loan was successfull!
	</p>
</template>

<script setup>
import { useAuthStore } from "../../stores/AuthStore";

const authStore = useAuthStore();

function loanMoney() {
	authStore.loanMoney();
}

function deleteAccount() {
	authStore.deleteAccount();
}
</script>
