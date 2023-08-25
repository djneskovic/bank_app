<template>
	<div class="payments">
		<div class="transfer">
			<h2>Transfer Money</h2>

			<!-- Transfer -->

			<div
				class="transfer-inputs md:flex md:items-center md:justify-center md:gap-4"
			>
				<input
					type="text"
					placeholder="Enter username"
					v-model="authStore.username"
				/>
				<input
					type="number"
					placeholder="Amount"
					v-model="authStore.amount"
				/>
			</div>
			<button class="btn" @click="transferMoney()">Send</button>
		</div>

		<!-- Loan -->

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

		<!-- Delete -->

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
		Loan was successful!
	</p>

	<p
		class="loanMessage animate__animated animate__backInUp animate__faster"
		v-if="authStore.transferMessage"
	>
		Transfer was successful!
	</p>
	<p
		class="loanMessage animate__animated animate__backInUp animate__faster"
		v-if="authStore.transferMessageError"
	>
		Receiver user not found.
	</p>
	<p
		class="loanMessage animate__animated animate__backInUp animate__faster"
		v-if="authStore.transferNoFunds"
	>
		Insufficient funds.
	</p>
</template>

<script setup>
import { useAuthStore } from "../../stores/AuthStore";

const authStore = useAuthStore();

function transferMoney() {
	authStore.transferMoney(authStore.username, authStore.amount);
}

function loanMoney() {
	authStore.loanMoney();
}

function deleteAccount() {
	authStore.deleteAccount();
}
</script>
