import { createRouter, createWebHistory } from "vue-router";

import LoginView from "../js/views/LoginView.vue";
import UserView from "../js/views/UserView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			redirect: "/login",
		},
		{
			name: "login",
			path: "/login",
			component: LoginView,
		},
		{
			name: "user",
			path: "/user/:username",
			component: UserView,
		},
	],
});

export default router;
