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
				<input type="number" placeholder="Amount" />
			</div>
			<button class="btn">Loan</button>
		</div>
		<div class="delete">
			<h2>Delete Account</h2>
			<div
				class="transfer-inputs md:flex md:items-center md:justify-center md:gap-4"
			>
				<input type="text" placeholder="Enter email" />
				<input type="password" placeholder="Enter password" />
			</div>
			<button class="btn">Loan</button>
		</div>
	</div>
</template>
