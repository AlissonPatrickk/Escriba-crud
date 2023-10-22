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
        <q-input outlined label="Nome completo" stack-label v-model.trim="name" @input="sanitizeNameInput" filled />
        <q-input outlined label="Documento" stack-label v-model="document" filled mask="###.###.###-##" />
        <q-input outlined label="Senha" stack-label v-model="password" filled :type="isPwd ? 'password' : 'text'">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>
        <q-input outlined label="Data de nascimento" stack-label v-model="birthday" filled type="date" />
        <q-btn color="primary" @click="register" :disabled="!isFormValid">
          Cadastrar
        </q-btn>
        <div v-if="error" class="q-mt-md text-h6 text-negative">{{ error }}</div>
      </div>
    </div>
  </q-page>
</template>
<script>
import axios from 'axios';
export default {
  name: 'Register',
  data() {
    return {
      name: null,
      document: null,
      password: null,
      birthday: null,
      isPwd: true,
      error: null
    }
  },
  methods: {
    async register() {
      this.error = null;
      const users = await axios.get('http://localhost:3000/pessoas');
      const cpfExists = users.data.some(user => user.cpf === this.document);
      if (cpfExists) {
        this.error = 'Este CPF já foi cadastrado.';
      } else {
        const formData = {
          nome: this.name,
          cpf: this.document,
          dataNascimento: this.birthday,
          senha: this.password
        };
        await axios.post('http://localhost:3000/pessoas', formData)
          .then((response) => {
            if (response.status === 201) {
              this.$store.dispatch('setAuthenticatedUser', response.data);
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
      }
    },
    clearInputs() {
      this.name = "";
      this.document = "";
      this.password = "";
      this.birthday = "";
    },
    sanitizeNameInput() {
      this.name = this.name.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s-]/g, '');
    }
  },
  computed: {
    isFormValid() {
      return this.name && this.name.trim() !== "" &&
        this.document && this.document.trim().length === 14 &&
        this.password && this.password.trim() !== "" &&
        this.birthday;
    }
  },
  watch: {
    document: function (newDocument, oldDocument) {
      if (newDocument !== oldDocument) {
        this.error = null;
      }
    },
    name: function () {
      this.sanitizeNameInput();
    }
  },
}
</script>

<style scoped>
.btn-back {
  position: fixed;
  top: 60px;
  left: 10px;
}
</style>
<style scoped>
.btn-back {
  position: fixed;
  top: 60px;
  left: 10px;
}
</style>
