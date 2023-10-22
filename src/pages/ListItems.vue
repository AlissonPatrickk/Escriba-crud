<template>
    <q-page class="q-pa-md row items-start q-gutter-md justify-center">
        <div class="col-12" style="text-align: center;">
            <h4>Produtos</h4>
            <div class="row row q-col-gutter-lg">
                <div v-for="item in items" :key="item.id" class="col-xs-12 col-sm-12 col-md-4 col-lg-3 col-xl-3">
                    <q-card>
                        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
                            <div class="absolute-bottom">
                                <div class="text-h6">{{ item.descricao }}</div>
                                <div class="text-subtitle2">Preço R${{ formatPrice(item.valoUnitario) }}</div>
                            </div>
                        </q-img>
                        <q-card-actions class="flex justify-between">
                            <q-input label="Quantidade" filled type="text" v-model="item.quantity"
                                @input="updateQuantity(item)" :disable="item.addedToCart" />
                            <q-btn outline @click="addBuy(item)" :disable="item.addedToCart">
                                {{ item.addedToCart ? 'Adicionado' : 'Adicionar ao carrinho' }}
                            </q-btn>
                        </q-card-actions>
                    </q-card>
                </div>
            </div>
        </div>
    </q-page>
</template>
  
<script>
import axios from 'axios';
import { replaceDecimalSeparator } from '../utils/index'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'ListItems',
    data() {
        return {
            items: [],
            buyItems: [],
        };
    },
    created() {
        axios.get('http://localhost:3000/produtos').then((response) => {
            this.items = response.data.map(item => ({
                ...item,
                quantity: null,
                quantityTotal: 0,
                addedToCart: false,
            }));
        });
    },
    methods: {
        addBuy(item) {
            const quantity = parseInt(item.quantity);
            if (quantity > 0) {
                const totalValue = item.valoUnitario * quantity;
                item.quantityTotal = totalValue.toFixed(2);
                this.buyItems.push(item);
                item.addedToCart = true;
                this.$store.dispatch('setAddItem', this.buyItems);
            } else {
                console.log('Quantidade inválida');
            }
        },
        updateQuantity(item) {
            const quantity = parseFloat(item.quantity);
            if (!isNaN(quantity) && quantity >= 0) {
                item.quantity = quantity;
            } else {
                item.quantity = 0;
            }
        },
        formatPrice(number) {
            return replaceDecimalSeparator(number);
        },
    },
};
</script>
  