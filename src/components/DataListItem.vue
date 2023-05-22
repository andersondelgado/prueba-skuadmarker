<template>
    <ion-card v-if="data" @click="toLink('/detail/?id=' + data?.id)" :detail="false" class="list-item">
        <img alt="Silhouette of mountains" class="ion-text-center abc" :src="data?.detail?.sprites?.back_default" />
        <ion-card-header>
            <ion-card-title>{{ data.name }}</ion-card-title>
            <ion-card-subtitle>#{{ data.id }}</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
            <ion-note>
                Moves {{ data?.detail?.moves?.length }} Experiences {{ data?.detail?.base_experience }}
            </ion-note>
        </ion-card-content>
        <ion-chip v-for="i in data?.detail?.types">
            {{ i?.type?.name }}
        </ion-chip>
    </ion-card>
</template>
<script setup lang="ts">
import { IonNote, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip } from '@ionic/vue';

import {  useRouter } from 'vue-router';

defineProps({
    data: Object,
});

const router = useRouter();
const toLink = (url: string) => {
    console.log(url);
    router.replace(url);
}

</script>
<style scoped>
.abc {
    --background: rgb(228, 228, 243);
}
</style>