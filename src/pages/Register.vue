<template>
  <q-page class="row justify-center">
    <div class="col-xs-10 col-sm-8 col-md-5 col-lg-5 col-xl-5">
      <q-btn class="btn-back" clickable round v-ripple @click="this.$router.push('/')">
        <q-icon name="west" />
      </q-btn>
      <div class="col-12" style="text-align: center;">
        <h4>Se cadastre</h4>
      </div>
      <div class="q-gutter-y-md column">
        <q-input outlined label="Nome completo" stack-label :dense="dense" v-model="name" filled type="name" />
        <q-input outlined label="Documento" stack-label :dense="dense" v-model="document" filled type="document" />
        <q-input outlined label="Senha" stack-label :dense="dense" v-model="password" filled
          :type="isPwd ? 'password' : 'text'">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>
        <q-input outlined label="Data de nascimento" stack-label :dense="dense" v-model="birthday" filled type="date" />
        <q-btn color="primary" @click="register" :disabled="!isFormValid">
          Cadastrar
        </q-btn>
      </div>
    </div>
  </q-page>
</template>
<script>
import axios from 'axios';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Register',
  data() {
    return {
      name: "",
      document: "",
      password: "",
      birthday: "",
      isPwd: true,
      error: null
    }
  },
  methods: {
    register() {
      const formData = {
        nome: this.name,
        cpf: this.document,
        dataNascimento: this.birthday,
        senha: this.password
      };
      this.error = null;
      axios.post('http://localhost:3000/pessoas', formData)
        .then((response) => {
          if (response.status === 201) {
            this.$router.push('/Items');
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
    clearInputs() {
      this.name = "";
      this.document = "";
      this.password = "";
      this.birthday = "";
    }
  },
  computed: {
    isFormValid() {
      return this.name !== "" && this.document !== "" && this.password !== "" && this.birthday !== "";
    }
  }
}
</script>
<style scoped>
.btn-back {
  position: fixed;
  top: 60px;
  left: 10px;
}
</style>
