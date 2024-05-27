<template>
    <div>
        <div class="container container-fluid bg-light p-4 d-flex align-items-center w-100 justify-content-around" v-if="!componenteEditar.nome">
            <div class="me-5">
                <span>Nome: </span>
                <input type="text" class="form-control" v-model="nome">
            </div>
            <div class="me-5">
                <span>Descrição: </span>
                <input type="text" class="form-control" v-model="descricao">
            </div>
            <button class="btn btn-dark p-2" @click="adicionar">
                Novo componente
                <font-awesome-icon icon="fa-solid fa-plus" class="ms-2" />
            </button>
        </div>
        <div class="container container-fluid bg-light p-4 d-flex align-items-center w-100 justify-content-around mt-3" v-else>
            <div class="me-5">
                <span>Nome: </span>
                <input type="text" class="form-control" v-model="componenteEditar.nome">
            </div>
            <div class="me-5">
                <span>Descrição: </span>
                <input type="text" class="form-control" v-model="componenteEditar.descricao">
            </div>
            <button class="btn btn-dark p-2 shadow" @click="editar">
                Editar componente
                <font-awesome-icon icon="fa-solid fa-plus" class="ms-2" />
            </button>
            <button class="btn btn-secondary p-2 ms-2 shadow" @click="componenteEditar.nome = ''">
                Cancelar
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: {
        componentes: Object,
        componenteEditar: Object
    },
    data(){
        return{
            nome: '',
            descricao: ''
        }
    },
    methods: {
        async adicionar (){
            await axios.post("http://localhost:8800/", {
                nome_componente: this.nome ,
                desc_componente: this.descricao
            })
            .then((response) => {
                alert('Componente criado com sucesso')
                location.reload(true)
            })
        },
        async editar(){
            await axios.put("http://localhost:8800/" + this.componenteEditar.id, {
                nome_componente: this.componenteEditar.nome,
                desc_componente: this.componenteEditar.descricao
            })
            .then((response) => {
                location.reload(true)
            })
        }
    }
}
</script>