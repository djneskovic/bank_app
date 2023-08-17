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
			token: null,
			successfull: false,
			userExist: false,
			users: [],
		};
	},

	actions: {
		openSignUpWindow() {
			this.signUpWindow = true;
		},

		setUser(data) {
			this.userId = data.userId;
			this.token = data.token;
		},

		initializeUsers() {
			const storedUsers =
				JSON.parse(localStorage.getItem("users")) || [];
			this.users = storedUsers;
		},

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

						const newUser = {
							id: Math.floor(Math.random() * 10000),
							email: this.email,
							password: this.password,
							username: this.username,
							amount: this.amount,
						};

						this.users.push(newUser);

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
	},
});
