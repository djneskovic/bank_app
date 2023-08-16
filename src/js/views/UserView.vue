<template>
	<div>
		<h2>User Details</h2>
		<div v-if="user">
			<p>Username: {{ user.username }}</p>
			<p>Amount: {{ user.amount }}</p>
		</div>
		<div v-else>
			<p>Loading...</p>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const user = ref(null);
const { params } = useRoute(); // Import useRoute from 'vue-router'

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
