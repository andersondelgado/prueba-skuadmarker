<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar class="abc">
                <ion-title style="color:aliceblue">What pokemon are you looking for?</ion-title>
            </ion-toolbar>
            <ion-toolbar class="abc" style="color:aliceblue">
                <ion-buttons slot="start">
                    <ion-input placeholder="Search pockemon" type="search" @ionInput="onInput($event)"></ion-input>
                    <ion-button id="open-modal" expand="block">
                        <ion-icon aria-hidden="true" :icon="optionsOutline" v-if="isIos()" size="small"></ion-icon>
                        filter
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <!-- <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
                <ion-refresher-content></ion-refresher-content>
            </ion-refresher> -->

            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">pockemon</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-list class="ion-padding">
                <DataListItem v-for="data in list" :data="data" />
                <ion-buttons slot="start">
                    <ion-button @click="evtPrevious()">previous</ion-button>
                    <ion-button @click="evtNext()">Next</ion-button>
                </ion-buttons>
            </ion-list>

            <ion-modal ref="modal" trigger="open-modal" @willDismiss="onWillDismiss">
                <ion-header>
                    <ion-toolbar>
                        <ion-buttons slot="start">
                            <ion-button @click="cancel()">Cancel</ion-button>
                        </ion-buttons>
                        <ion-title>Filter pockemon list</ion-title>
                        <ion-buttons slot="end">
                            <ion-button :strong="true" @click="confirm()">Confirm</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding">
                    <ion-item>
                        <ion-input ref="input" type="text" placeholder="Your filter by Experience"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input ref="input2" type="text" placeholder="Your filter by moves"></ion-input>
                    </ion-item>
                </ion-content>
            </ion-modal>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonList,
    IonPage,
    IonRefresher,
    IonModal,
    IonButtons,
    IonButton,
    IonIcon,
    IonItem, IonLabel, IonInput,
    IonRefresherContent,
    IonTitle,
    IonToolbar,
} from '@ionic/vue';
import DataListItem from '@/components/DataListItem.vue';
import { listPockemon, get } from '@/services/pockemon';
import { defineComponent, ref } from 'vue';
import { OverlayEventDetail } from '@ionic/core/components';
import { optionsOutline } from 'ionicons/icons';
export default defineComponent({
    components: {
        IonContent,
        IonHeader,
        IonList,
        IonPage,
        IonRefresher,
        IonRefresherContent,
        IonTitle,
        IonToolbar,
        DataListItem,
        IonIcon,
        IonModal,
        IonButtons,
        IonButton,
        IonItem, IonLabel, IonInput,

    },
    setup() {
        return {
            optionsOutline
        }
    },
    data() {
        return {
            list: [
                {
                    name: '',
                    detail: {
                        base_experience: 0,
                        moves: []
                    }
                }
            ],
            next: '',
            previous: ''
        }
    },
    computed: {

    },
    methods: {
        evtPrevious() {
            if (this.previous != null) {
                this.setList2(this.previous);
            }
        },
        evtNext() {
            if (this.next.length != null) {
                this.setList2(this.next);
            }
        },
        onInput(event: any) {
            let old = this.list.filter((i) => i?.name?.toLowerCase().includes(event.target!.value.toLowerCase()));
            // this.list = old.length>0?old:this.setList();
            if (event.target!.value) {
                this.list = old;
            } else {
                this.setList();
            }
        },
        isIos() {
            const win = window as any;
            return win && win.Ionic && win.Ionic.mode === 'ios';
        },
        onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
            if (ev.detail.role === 'confirm') {
                // this.message = `Hello, ${ev.detail.data}!`;
            }
        },
        cancel() {
            let data: any = this.$refs;
            // data.modal?.$el.dismiss(null, 'cancel');
            let e: any = data.modal;
            let ee: any = e.$el;
            ee.dismiss(null, 'cancel');
        },
        confirm() {
            let data: any = this.$refs;
            let m=data.modal;
            let modal=m.$el;
            let e: any = data.input;
            let e1: any = data.input2;
            let ee: any = e.$el;
            let ee1: any = e1.$el;
            // const experience = this.$refs.input.$el.value;
            // const moves = this.$refs.input2.$el.value;
            const experience = ee.value;
            const moves = ee1.value;

            // this.setList();
            if (experience) {
                let old = this.list.filter((i) => i?.detail?.base_experience.toString().toLowerCase()
                    .includes(experience.toLowerCase()));
                this.list = old;
            } else if (moves) {
                let old = this.list.filter((i) => i?.detail?.moves?.length.toString().toLowerCase().includes(moves.toLowerCase()));
                this.list = old;
                // return;
            } else {
                this.setList();
            }

            modal.dismiss(this.list, 'confirm');
        },
        async setList() {
            let res = await listPockemon({ limit: 10, offset: 0 })
            let data = res.data.results;
            this.next = res.data?.next;
            this.previous = res.data?.previous;
            for (let d of data) {
                let r = await this.setAnyData(d.url);
                d['id'] = r.id;
                d['detail'] = r;

            }
            this.list = data;
            console.log(this.list);

        },
        async setList2(uri: string) {
            let res = await get(uri);
            let data = res.data.results;
            this.next = res.data?.next;
            this.previous = res.data?.previous;
            for (let d of data) {
                let r = await this.setAnyData(d.url);
                d['id'] = r.id;
                d['detail'] = r;
            }
            this.list = data;
        },
        async setAnyData(uri: string) {
            let res = await get(uri);
            return res.data;
        }
    },
    mounted() {
        this.setList();
    }
});

</script>
<style scoped>
.abc {
    --background: rgba(63, 63, 215, 0.971);
}
</style>