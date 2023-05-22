<template>
    <ion-card>
        <ion-list lines="none">
            <ion-item>
                Species: {{ data?.species?.name }}
            </ion-item>
            <ion-item>
                Height: {{ data?.height }}
            </ion-item>
            <ion-item>
                abilities: {{ data?.abilities?.length }}
            </ion-item>
            <ion-item>
                Experience: {{ data?.base_experience }}
            </ion-item>
            <ion-item>
                Type:
                <ion-chip v-for="i in data?.types">
                    {{ i?.type?.name }}
                </ion-chip>
            </ion-item>
        </ion-list>

        <ion-card-title>
            Base stats
        </ion-card-title>
        <Bar id="my-chart-id" :options="chartOptions" :data="chartData" :style="myStyles" />
    </ion-card>
</template>
<script lang="ts">
import {
    IonNote, IonItem, IonCard, IonCardContent, IonCardHeader,
    IonCardSubtitle, IonList, IonCardTitle, IonChip
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { getPockemon } from '@/services/pockemon';

import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default defineComponent({
    components: {
        IonNote, IonItem, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip,
        IonList,
        Bar
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
                height: null,
                abilities: [],
                base_experience: null,
                types: [{
                    type: {
                        name: null
                    }
                }],
                stats: [{
                    base_stat: 0,
                    stat: {
                        name: ''
                    }
                }]
            },
            chartData: {
                labels: [],
                datasets: [{ data: [] }]
            },
            chartOptions: {
                responsive: true,                
            }
        }
    },
    methods: {
        async detailData(id: string) {
            let res = await getPockemon(id);
            let r = res.data;
            this.data = r;
            let dataset = [];
            let labels = [];
            let chartData: any = {
                labels: [],
                datasets: [
                    {
                        label: '',
                        backgroundColor: '#3880ff',
                        data: []
                    }
                ]
            };
            for (let i of r.stats) {
                dataset.push(i?.base_stat);
                labels.push(i?.stat?.name);
            }

            chartData.labels = labels;
            chartData.datasets[0].data = dataset;
            this.chartData = chartData;
        }
    },
    computed: {
        myStyles() {
            return {
                height: `20vh`,
                width: `40vw`,
                position: 'relative'
            }
        }
    },
    mounted() { 
        const route = useRoute(); 
        let params = route.query.id !== undefined ? route.query.id : route.params.id
        let id = parseInt(params as string, 10);
        this.detailData(id.toString());
    }
})
</script>