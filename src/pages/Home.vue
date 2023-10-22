<template>
  <q-page class="row justify-around items-start">
    <div class="col-xs-10 col-sm-10 col-md-5 col-lg-5 col-xl-5 row">
      <img src="../assets/escriba.png" alt="Escriba" style="width: 100%;" />
      <div class="title-text">Deseja comprar nossos itens?</div>
      <div class="title-text">Faça o login e confira os melhores produtos e preços do Brasil!</div>
    </div>
    <div class="col-xs-10 col-sm-10 col-md-5 col-lg-5 col-xl-5 q-pa-m card-sign">
      <div class="q-gutter-y-md column col-12">
        <q-input outlined label="Documento" v-model="document" filled mask="###.###.###-##" />
        <q-input outlined label="Senha" v-model="password" filled :type="isPwd ? 'password' : 'text'">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>
        <div style="display: flex; justify-content: space-between;">
          <q-btn flat color="primary" @click="navigateTsignInoRegister">
            Não possui conta?
          </q-btn>
          <q-btn color="primary" @click="signIn" :disabled="!canSignIn()">
            Entrar
          </q-btn>
        </div>
        <div v-if="error" class="q-mt-md text-h6 text-negative">{{ error }}</div>
      </div>
    </div>
  </q-page>
</template>
<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      document: null,
      password: null,
      isPwd: true,
      error: null,
    }
  },
  methods: {
    navigateTsignInoRegister() {
      this.$router.push('/Register');
    },
    signIn() {
      this.error = null;
      axios.get('http://localhost:3000/pessoas')
        .then((response) => {
          const customerWithDocument = response.data.find(user => user.cpf === this.document);
          if (customerWithDocument) {
            if (customerWithDocument.senha === this.password) {
              this.$store.dispatch('setAuthenticatedUser', customerWithDocument);
              this.$router.push('/Items');
            } else {
              this.error = 'Senha incorreta';
            }
          } else {
            this.error = 'Usuário não cadastrado';
          }
        })
        .catch((error) => {
          console.error('Erro na chamada da API:', error);
          this.error = 'Erro ao conectar com o servidor';
        });
    },
    canSignIn() {
      return this.password && this.document && this.document.length === 14;
    },
  }
}
</script>
<style scoped>
.title-text {
  font-size: 25px;
  font-weight: bold;
}

.card-sign {
  background-color: #ecf3f8;
  padding: 30px;
  border-radius: 15px;
  margin-top: 10%;
}
</style>
