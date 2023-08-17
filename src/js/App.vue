<template>
	<div>
		<router-view v-slot="{ Component }">
			<transition name="fade">
				<component :is="Component" />
			</transition>
		</router-view>
	</div>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
