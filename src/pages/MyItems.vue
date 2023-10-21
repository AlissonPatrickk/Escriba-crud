<template>
    <q-page class="q-pa-md">
        <div class="col-6 row q-gutter-md justify-center">
            <h4>Meus produtos</h4>
            <q-table class="col-12" flat bordered grid title="Produto" :rows="items" :columns="columns" row-key="name"
                hide-header />
            <div class="col-12" v-if="items.length === 0">
                Nenhum item encontrado.
            </div>
        </div>
    </q-page>
</template>
  
<script>
import axios from "axios";
export default {
    name: "MyItems",
    data() {
        return {
            user: {},
            items: [],
            columns: [
                {
                    name: "descricao",
                    required: true,
                    label: "Nome do Produto",
                    align: "left",
                    field: "descricao",
                },
                {
                    name: "valoUnitario",
                    required: true,
                    label: "Preço",
                    align: "right",
                    field: "valoUnitario",
                    format: (val) => `R$ ${val}`,
                },
                {
                    name: "quantity",
                    required: true,
                    label: "Quantidade",
                    align: "right",
                    field: "quantity",
                },
                {
                    name: "subtotal",
                    required: true,
                    label: "Preço total",
                    align: "right",
                    field: "subtotal",
                },
            ],
        };
    },
    created() {
        this.user = this.$store.state.user;
        axios.get("http://localhost:3000/pedidos").then((response) => {
            if (Array.isArray(response.data)) {
                const products = response.data.filter((produto) => {
                    return (
                        produto.cliente.cpf === this.user.cpf ||
                        produto.cliente.nome === this.user.nome
                    );
                });

                const items = [];
                for (const product of products) {
                    for (const item of product.itens) {
                        items.push({
                            descricao: item.produto.descricao,
                            valoUnitario: item.valor,
                            quantity: item.quantidade,
                            subtotal: item.subtotal,
                        });
                    }
                }

                this.items = items;
            }
        });
    },
};
</script>
  