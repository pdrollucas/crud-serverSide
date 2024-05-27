<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <adicao :componentes="componentes" :componenteEditar="componenteEditado" class="mb-5"></adicao>
    <div class="input-group mb-5 mt-5 w-50">
      <input type="search" class="form-control" placeholder="Nome do componente" aria-label="Nome do componente"
        aria-describedby="basic-addon2" v-model="busca">
      <span class="input-group-text" id="basic-addon2">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass"/>
      </span>
    </div>
    <v-table height="500px" fixed-header class="w-100">
      <thead>
        <tr>
          <th class="text-left">
            Código
          </th>
          <th class="text-left">
            Nome
          </th>
          <th class="text-left">
            Descrição
          </th>
          <th class="text-center">
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="componente in componentesFiltrados" :key="componente.codigo_componente">
          <td>{{ componente.codigo_componente }}</td>
          <td>{{ componente.nome_componente }}</td>
          <td>{{ componente.desc_componente }}</td>
          <td class="text-center">
            <button class="btn btn-secondary ms-2 shadow-sm">
              <font-awesome-icon icon="fa-solid fa-pen-to-square" @click="editar(componente)" />
            </button>
            <button class="btn btn-danger ms-2 shadow-sm" @click="deletar(componente)">
              <font-awesome-icon icon="fa-solid fa-trash-can" />
            </button>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import axios from 'axios'
import adicao from './adicao.vue';

export default {
  components: {
    adicao
  },
  data() {
    return {
      componentes: {},
      componenteEditado: {
        id: '',
        nome: '',
        descricao: ''
      },
      busca: ''
    }
  },
  created() {
    axios.get("http://localhost:8800")
      .then((response) => {
        console.log(response)
        this.componentes = response.data
      })
  },
  computed: {
    componentesFiltrados: function(){
      let buscaMinusculo = this.busca.toLowerCase()

      if(buscaMinusculo !== ''){
        return this.componentes.filter((componente) => {
          const nomeMinusculo = componente.nome_componente.toLowerCase()
          return nomeMinusculo.match(buscaMinusculo)
        })
      } return this.componentes
    }
  },
  methods: {
    async deletar(componente) {
      let resultado = confirm(`Deseja realmente excluir o item "${componente.nome_componente}"?`)
      let id = componente.codigo_componente
      if (resultado) {
        await axios.delete("http://localhost:8800/" + id)
          .then((response) => {
            const newArray = this.componentes.filter((componente) => componente.codigo_componente !== id)
            this.componentes = newArray
          }).catch(({ data }) => {
            console.log(data)
          })
      }
    },
    async editar(componente) {
      this.componenteEditado.id = componente.codigo_componente
      this.componenteEditado.nome = componente.nome_componente
      this.componenteEditado.descricao = componente.desc_componente
    }
  }
}
</script>

<style></style>