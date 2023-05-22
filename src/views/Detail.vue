<template>
    <ion-page>
        <ion-header :translucent="true" class="abc">
            <ion-toolbar class="abc">
                <ion-buttons slot="start">
                    <ion-back-button :text="getBackButtonText()" default-href="/"></ion-back-button>
                </ion-buttons>

            </ion-toolbar>
            <ion-toolbar class="abc">
                <ion-title class="ion-text-center">
                    <h2> {{ data?.name }} #{{ data?.id }}</h2>
                    <img alt="Silhouette of mountains" :src="data?.sprites?.back_default" />
                </ion-title>
            </ion-toolbar>

        </ion-header>
        <ion-content>


            <!-- <ion-header> -->
            <ion-toolbar>
                <ion-buttons :collapse="true" slot="start">
                    <ion-button v-bind:color="selected === 'about' ? 'primary' : ''"
                        @click="selectedOpt('about')">About</ion-button>

                    <ion-button v-bind:color="selected === 'moves' ? 'primary' : ''" 
                    @click="selectedOpt('moves')">Moves</ion-button>
                </ion-buttons>
            </ion-toolbar>
            <!-- </ion-header> -->

            <About v-if="selected === 'about'" />
            <Moves v-if="selected === 'moves'" />
        </ion-content>

    </ion-page>
</template>
<script lang="ts">
import {
    IonBackButton,
    IonButtons,
    IonButton,
    IonHeader,
    IonTabBar,
    IonTabButton,
    IonContent,
    IonTabs,
    IonPage,
    IonToolbar,
    IonRouterOutlet,
    IonRow, IonCol,
    IonTitle,
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip
} from '@ionic/vue';
import { defineComponent } from 'vue';
import About from './About.vue';
import Moves from './Moves.vue';
import { useRoute, useRouter } from 'vue-router';
import { getPockemon } from '@/services/pockemon';

export default defineComponent({
    components: {
        IonBackButton,
        IonButtons,
        IonButton,
        IonHeader,
        IonTabBar,
        IonTabButton,
        IonTabs,
        IonPage,
        IonToolbar,
        IonContent,
        IonRow, IonCol,
        IonTitle,
        About, Moves,
        IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip,
        IonRouterOutlet
    },
    setup() {
        const router = useRouter();

        return {
            // beforeTabChange,
            router
        }
    },
    data() {
        return {
            data: {
                id: '',
                name: '',
                sprites: {
                    back_default: ''
                }
            },
            id: "",
            selected: '0'
        }
    },
    methods: {
        toLink(url: string) {
            const router = useRouter();
            console.log(url);
            router.replace(url);
        },
        selectedOpt(url: string) {
            this.selected = url;
        },
        getBackButtonText() {
            const win = window as any;
            const mode = win && win.Ionic && win.Ionic.mode;
            return mode === 'ios' ? 'Inbox' : '';
        },
        async detailData(id: string) {
            let res = await getPockemon(id);
            this.data = res.data;
        },
    },
    mounted() {
        const route = useRoute();

        let id = parseInt(route.query.id as string, 10);
        this.id = id.toString();
        this.detailData(id.toString());
        this.selectedOpt('about');
    }
});
</script> 
<style scoped>
.abc {
    --background: rgba(239, 239, 243, 0.971);
}
</style>