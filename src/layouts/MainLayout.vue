<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          Escriba
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above :width="200" :breakpoint="500" bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
      <q-scroll-area style="height: calc(100% - 100px); margin-top: 100px; border-right: 1px solid #ddd">
        <q-list padding>
          <q-item clickable v-ripple @click="this.$router.push('/MyItems')">
            <q-item-section avatar>
              <q-icon name="shopping_bag" />
            </q-item-section>
            <q-item-section>
              Items comprados
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="this.$router.push('/AddItems')">
            <q-item-section avatar>
              <q-icon name="shopping_cart" />
            </q-item-section>
            <q-item-section>
              Seu carrinho
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="this.$router.push('/Items')">
            <q-item-section avatar>
              <q-icon name="add_shopping_cart" />
            </q-item-section>
            <q-item-section>
              Comprar itens
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="this.$router.push('/')">
            <q-item-section avatar>
              <q-icon name="west" />
            </q-item-section>
            <q-item-section>
              Sair
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 100px">
        <div class="absolute-bottom bg-transparent">
          <div class="text-weight-bold">{{ authenticatedUser.nome }}</div>
          <div>{{ authenticatedUser.cpf }}</div>
        </div>
      </q-img>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  name: 'MainLayout',
  data() {
    return {
      leftDrawerOpen: false,
      authenticatedUser: {}
    }
  },
  created() {
    this.authenticatedUser = this.$store.state.user;
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    }
  }
}
</script>
