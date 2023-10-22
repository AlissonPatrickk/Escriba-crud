<template>
    <q-page class="q-pa-md">
        <div class="col-6 row q-gutter-md justify-center">
            <h4 class="col-12" style="text-align: center;">Pedidos</h4>
            <h5 class="col-12" v-if="items.length === 0" style="text-align: center;">
                Nenhum item encontrado.
            </h5>
            <q-card class="col-xs-12 col-sm-10 col-md-4 col-lg-3 col-xl-3" v-else v-for="(value, index) in items"
                :key="index">
                <q-card-section>
                    <ItemCard :item="value.itens" :total="value.valorTotal" @click="deleteItem(value.id)" />
                </q-card-section>
            </q-card>
        </div>
    </q-page>
</template>
  
<script>
import axios from "axios";
import ItemCard from "components/ItemCard.vue";

export default {
    name: "MyItems",
    components: {
        ItemCard,
    },
    data() {
        return {
            user: {},
            items: [],
        };
    },
    created() {
        this.user = this.$store.state.user;
        this.fetchItems();
    },
    methods: {
        fetchItems() {
            axios.get("http://localhost:3000/pedidos").then((response) => {
                if (Array.isArray(response.data)) {
                    this.items = response.data.filter((pedido) => {
                        return (
                            pedido.cliente &&
                            (pedido.cliente.cpf === this.user.cpf ||
                                pedido.cliente.nome === this.user.nome)
                        );
                    });
                }
            });
        },
        deleteItem(itemId) {
            axios
                .delete(`http://localhost:3000/pedidos/${itemId}`)
                .then(() => {
                    this.fetchItems();
                })
                .catch((error) => {
                    console.error("Erro ao excluir o item:", error);
                });
        },
    },
};
</script>
  