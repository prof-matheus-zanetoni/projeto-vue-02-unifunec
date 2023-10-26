<template>
    <div class="card position-absolute top-50 start-50 translate-middle">
        <div class="card-header text-center">
            <h1>Profissões</h1>
        </div>
        <div class="card-body">
            <table class="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th colspan="2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="profissao in profissoes">
                        <td>{{ profissao.codigoProfissao }}</td>
                        <td>{{ profissao.nomeProfissao }}</td>
                        <td>
                            <button class="btn btn-primary">Consultar</button>
                        </td>
                        <td>
                            <button class="btn btn-danger">Excluir</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
    import Swal from 'sweetalert2'
    import ProfissaoService from '../services/ProfissaoService'
    import { ref, onBeforeMount } from 'vue'
    const profissaoService = new ProfissaoService()
    const profissoes = ref([])

    onBeforeMount(() => {
        listar()
    })

    function listar() {
        profissaoService.listar().then((response) => {
            profissoes.value = response.data
        }).catch((error) => {
            Swal.fire({title: "Erro", 
            text: "Erro ao listar profissões", icon: "error",
            allowOutsideClick: false})
        })
    }

    function excluir(codigoProfissao) {
        Swal.fire({title: "Atenção", 
        text: "Deseja realmente excluir esta profissão?",
        icon: "question", confirmButtonText: "Sim",
        cancelButtonText: "Não", showCancelButton: true,
        confirmButtonColor: "green", cancelButtonColor: "red",
        allowOutsideClick: false}).then((response) => {
            if(response.isConfirmed) {
                profissaoService.excluir(codigoProfissao)
                .then((response) => {
                    Swal.fire({title: "Sucesso",
                    text: "Profissão excluída com sucesso!",
                    icon: "success"}).then((response) => {
                        if(response.isConfirmed) {
                            listar()
                        }
                    })
                }).catch((error) => {
                    Swal.fire({title: "Erro",
                    text: "Erro ao excluir da profissão",
                    icon: "error"})
                })
            }
        })
    }
</script>