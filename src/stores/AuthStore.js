import { defineStore } from "pinia";
import router from "../router/index.js";
import axios from "axios";

export const useAuthStore = defineStore("authStore", {
	state() {
		return {
			signUpWindow: false,
			email: "",
			password: "",
			username: "",
			amount: "",
			errorMsg: false,
			signInError: false,
			userId: null,
			token: localStorage.getItem("accessToken") || null,
			refreshToken: localStorage.getItem("refreshToken") || null,
			successfull: false,
			userExist: false,
			users: [],
			user: null,
			///////////////////////////
			loanAmount: "",
			loanMessage: false,
			///////////////////////////
			transferMessage: false,
		};
	},

	actions: {
		openSignUpWindow() {
			this.signUpWindow = true;
		},

		initializeUsers() {
			const storedUsers =
				JSON.parse(localStorage.getItem("users")) || [];
			this.users = storedUsers;
		},

		///////////////////////////////////////////////////////////////////

		signUp() {
			if (
				!this.email ||
				!this.email.includes("@") ||
				!this.password ||
				this.password.length < 6 ||
				!this.username ||
				!this.amount
			) {
				this.errorMsg = true;
				setTimeout(() => {
					this.errorMsg = false;
				}, 2000);
			} else {
				axios.post(
					`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCqwwPG8jzyInCMUSS1caob5Ogkx6Zb7N8`,
					{
						email: this.email,
						password: this.password,
					}
				)
					.then((res) => {
						const data = res.data;

						console.log(data);

						const newUser = {
							id: Math.floor(Math.random() * 10000),
							token: data.idToken,
							email: this.email,
							password: this.password,
							username: this.username,
							amount: this.amount,
							transaction: [],
						};

						this.users.push(newUser);

						console.log(this.users);

						localStorage.setItem(
							"users",
							JSON.stringify(this.users)
						);

						this.successfull = true;
						this.email = "";
						this.password = "";
						this.amount = "";
						this.username = "";
						setTimeout(() => {
							this.successfull = false;
							this.signUpWindow = false;
						}, 2000);
					})
					.catch((err) => {
						console.log(err, "error");
						this.userExist = true;
						setTimeout(() => {
							this.userExist = false;
						}, 2000);
					});
			}
		},

		signIn() {
			if (!this.email || !this.email.includes("@") || !this.password) {
				console.log(this.email);
				console.log(this.password);
				this.signInError = true;
				setTimeout(() => {
					this.signInError = false;
				}, 2000);
			} else {
				axios.post(
					"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCqwwPG8jzyInCMUSS1caob5Ogkx6Zb7N8",
					{
						email: this.email,
						password: this.password,
					}
				)
					.then((res) => {
						const data = res.data;
						console.log(data);

						const newUser = {
							id: Math.floor(Math.random() * 10000),
							token: data.idToken,
							email: this.email,
							password: this.password,
							username: this.username,
							amount: this.amount,
							transaction: [],
						};

						this.users.push(newUser);

						const storedUsers = JSON.parse(
							localStorage.getItem("users") || []
						);

						const matchedUser = storedUsers.find(
							(user) =>
								user.email === this.email &&
								user.password === this.password
						);

						if (matchedUser) {
							// Navigate to the user route and pass the user's ID as a parameter
							router.push({
								name: "user",
								params: {
									username: matchedUser.username,
								},
							});
						}

						this.email = "";
						this.password = "";
					})
					.catch((err) => {
						console.log(err, "Error");
						this.signInError = true;
						setTimeout(() => {
							this.signInError = false;
						}, 2000);
					});
			}
		},

		logout() {
			this.user = null;
			router.replace("/login");
		},

		//////////////////////////////////////////////////////////////////////////////////

		transferMoney(username, amount) {
			const senderUser = this.user;

			if (!senderUser || !username || !amount) return;

			const storedUsers =
				JSON.parse(localStorage.getItem("users")) || [];
			const receiverUser = storedUsers.find(
				(user) => user.username === username
			);

			if (!receiverUser) {
				console.log("Receiver user not found");
				return;
			}

			const transferAmount = parseFloat(amount);

			if (isNaN(transferAmount) || transferAmount <= 0) {
				console.log("Invalid transfer amount");
				return;
			}

			if (transferAmount > senderUser.amount) {
				console.log("Insufficient funds");
				return;
			}

			senderUser.amount = (
				parseFloat(senderUser.amount) - transferAmount
			).toFixed(2);
			receiverUser.amount = (
				parseFloat(receiverUser.amount) + transferAmount
			).toFixed(2);

			const transactionSender = {
				datetime: new Date().toLocaleDateString(),
				amount: -transferAmount,
			};
			const transactionReceiver = {
				datetime: new Date().toLocaleDateString(),
				amount: "+" + transferAmount,
			};

			senderUser.transaction.unshift(transactionSender);
			receiverUser.transaction.unshift(transactionReceiver);

			const senderIndex = storedUsers.findIndex(
				(user) => user.token === senderUser.token
			);
			if (senderIndex !== -1) {
				storedUsers[senderIndex] = senderUser;
			}

			const receiverIndex = storedUsers.findIndex(
				(user) => user.username === receiverUser.username
			);
			if (receiverIndex !== -1) {
				storedUsers[receiverIndex] = receiverUser;
			}

			localStorage.setItem("users", JSON.stringify(storedUsers));

			this.transferMessage = true;

			setTimeout(() => {
				this.transferMessage = false;
			}, 2000);

			this.username = "";
			this.amount = "";
		},

		/////////////////////////////////////////////////////////////////////////////

		loanMoney() {
			if (!this.loanAmount || !this.user) return;

			const newAmount =
				parseFloat(this.user.amount) + parseFloat(this.loanAmount);

			const transaction = {
				datetime: new Date().toLocaleDateString(),
				amount: parseFloat(this.loanAmount),
			};

			if (transaction.amount > 0) {
				transaction.amount = "+" + transaction.amount;
			}

			this.user.transaction.unshift(transaction);

			this.user.amount = newAmount.toFixed(1);
			const storedUsers =
				JSON.parse(localStorage.getItem("users")) || [];
			const userIndex = storedUsers.findIndex(
				(user) => user.token === this.user.token
			);
			if (userIndex !== -1) {
				storedUsers[userIndex].amount = newAmount.toFixed(2);
				storedUsers[userIndex].transaction.unshift(transaction);
				localStorage.setItem("users", JSON.stringify(storedUsers));
			}

			this.loanMessage = true;

			setTimeout(() => {
				this.loanMessage = false;
			}, 2000);

			this.loanAmount = "";
		},

		/////////////////////////////////////////////////////////////////////////////

		deleteAccount() {
			if (!this.email || !this.email.includes("@") || !this.password) {
				console.log(this.email);
				console.log(this.password);
				this.errorMsg = true;
				setTimeout(() => {
					this.errorMsg = false;
				}, 2000);
			} else {
				axios.post(
					"https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyCqwwPG8jzyInCMUSS1caob5Ogkx6Zb7N8",
					{
						idToken: this.user.token,
					}
				).then((res) => {
					const data = res.data;
					console.log(data);

					const storedUsers =
						JSON.parse(localStorage.getItem("users")) || [];
					const userIndex = storedUsers.findIndex(
						(user) => user.token === this.user.token
					);
					if (userIndex !== -1) {
						storedUsers.splice(userIndex, 1);
						localStorage.setItem(
							"users",
							JSON.stringify(storedUsers)
						);
					}

					this.email = "";
					this.password = "";

					router.replace("/login");
				});
			}
		},

		/////////////////////////////////////////////////////////////////////////////

		getUserInfo(username) {
			const storedUsers =
				JSON.parse(localStorage.getItem("users")) || [];

			const matchedUser = storedUsers.find(
				(user) => user.username === username
			);

			if (matchedUser) {
				this.user = matchedUser;
			}
		},
	},
});
