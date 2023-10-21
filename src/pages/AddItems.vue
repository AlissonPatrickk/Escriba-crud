<template>
    <q-page class="q-pa-md row items-start justify-center">
        <div class="col-xs-12 col-sm-10 row col-md-8 col-lg-6 col-xl-6 q-gutter-md justify-center">
            <h4>Carrinho</h4>
            <q-table class="col-12" :rows="items" row-key="id" :columns="columns" selection="multiple"
                v-model:selected="selected" />
            <div class="col-12" style="display: flex; justify-content: space-between;">
                <div><span style="font-size: 20px ">Total:</span> {{ totalPrice.toFixed(2) }}</div>
                <q-btn color="primary" label="Comprar Itens Selecionados" @click="addSelected"
                    :disabled="!selected.length > 0" />
            </div>
        </div>
    </q-page>
</template>
<script>
import axios from 'axios';

export default {
    name: 'AddItems',
    data() {
        return {
            items: [],
            selected: [],
            user: {},
            columns: [
                {
                    name: 'descricao',
                    required: true,
                    label: 'Nome do Item',
                    align: 'left',
                    field: 'descricao',
                },
                {
                    name: 'valoUnitario',
                    required: true,
                    label: 'Preço',
                    align: 'right',
                    field: 'valoUnitario',
                    format: (val) => `R$ ${val}`,
                },
                {
                    name: 'quantity',
                    required: true,
                    label: 'Quantidade',
                    align: 'right',
                    field: 'quantity',
                },
                {
                    name: 'quantityTotal',
                    required: true,
                    label: 'Quantidade Total',
                    align: 'right',
                    field: 'quantityTotal',
                },
            ],
        };
    },
    created() {
        this.items = this.$store.state.addItems
        this.user = this.$store.state.user
    },
    computed: {
        totalPrice() {
            return this.selected.reduce((total, item) => total + parseFloat(item.quantityTotal), 0);
        },
    },
    methods: {
        addSelected() {
            const selectedItems = this.selected;
            const currentDate = new Date();

            const formattedDate = currentDate.toISOString().slice(0, 10);

            const pedidos = {
                cliente: {
                    id: this.user.id,
                    nome: this.user.nome,
                    cpf: this.user.cpf
                },
                dataEmissao: formattedDate,
                valorTotal: this.totalPrice.toFixed(2),
                itens: selectedItems.map(item => {
                    return {
                        id: item.id,
                        produto: {
                            id: item.id,
                            descricao: item.descricao
                        },
                        valor: item.valoUnitario,
                        quantidade: item.quantity,
                        subtotal: (item.valoUnitario * item.quantity).toFixed(2)
                    };
                })
            };
            this.error = null;

            axios.post('http://localhost:3000/pedidos', pedidos)
                .then((response) => {
                    if (response.status === 201) {
                        this.$router.push('/MyItems');
                        this.clearInputs();
                    } else {
                        this.error = 'Erro no cadastro';
                    }
                })
                .catch((error) => {
                    console.error('Erro na chamada da API:', error);
                    this.error = 'Erro ao conectar com o servidor';
                });
        },
    },
};
</script>
  