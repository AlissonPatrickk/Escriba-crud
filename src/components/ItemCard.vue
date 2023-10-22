<template>
    <div class="item-card">
        <q-item class="row justify-between">
            <q-item-section class="col-7">
                <q-item-label v-for="(value, index) in item" :key="index">
                    <div class="text-h6">{{ value.produto.descricao }}</div>
                    <div class="q-mt-xs">Quantidade: {{ value.quantidade }}</div>
                    <div class="q-mt-xs">Preço total: R$ {{ formatPrice(value.subtotal) }}</div>
                </q-item-label>
            </q-item-section>
            <q-item-section class="col-4" style="display: grid; align-content: space-between;">
                <q-btn @click="deleteItem" color="negative" icon="delete" />
                <div style="font-size: 15px; font-weight: bold;">Custo: R${{ formatPrice(total) }}</div>
            </q-item-section>
        </q-item>
    </div>
</template>
  
<script>
import { replaceDecimalSeparator } from '../utils/index'
export default {
    name: 'ItemCard',
    props: {
        item: Object,
        total: Number
    },
    methods: {
        deleteItem() {
            this.$emit("delete");
        },
        formatPrice(number) {
            return replaceDecimalSeparator(number);
        },
    },
};
</script>
  