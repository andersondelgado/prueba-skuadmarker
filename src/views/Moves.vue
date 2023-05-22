<template>
    <ion-content no-padding>
        <ion-grid>
            <ion-note>
                {{ data?.moves.length }} moves
            </ion-note>
            <ion-row justify-content-center align-items-center>

                <ion-col v-for="i in data.moves" size="4" offset="0" col-6 offset-3 text-center>
                    <ion-card color="primary">
                        <ion-card-content text-center>
                            {{ i.move.name }}
                        </ion-card-content>
                    </ion-card>
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-content>
</template>
<script lang="ts">
import {
    IonNote, IonItem,
    IonCard, IonCardContent,
    IonGrid, IonRow, IonCol,
    IonContent,
    IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { getPockemon } from '@/services/pockemon';
export default defineComponent({
    components: {
        IonNote, IonItem, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
        IonGrid, IonRow, IonCol,
        IonChip, IonContent,
    },
    props: {
        datas: {}
    },
    data() {
        return {
            data: {
                species: {
                    name: null
                },
                moves: [{
                    move: {
                        name: null
                    }
                }]
            }
        }
    },
    methods: {
        async detailData(id: string) {
            let res = await getPockemon(id);
            this.data = res.data;
        }
    },
    mounted() {
        const route = useRoute();
        let params = route.query.id!==undefined ? route.query.id : route.params.id
        let id = parseInt(params as string, 10);
        this.detailData(id.toString());
    }
})
</script>