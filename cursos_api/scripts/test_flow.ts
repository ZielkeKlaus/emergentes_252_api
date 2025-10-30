import axios from 'axios'

const base = 'http://localhost:3001'

async function wait(ms: number) { return new Promise(r => setTimeout(r, ms)) }

(async () => {
  try {
    console.log('Aguardando servidor iniciar...')
    await wait(2000)

    // cria instrutor
    console.log('Criando instrutor...')
    const instrutorResp = await axios.post(`${base}/usuarios`, { nome: 'Instrutor Teste', email: `instrutor${Date.now()}@ex.com`, senha: 'Abc@12345', tipo: 'instrutor' })
    const instrutor = instrutorResp.data
    console.log('Instrutor:', instrutor.id)

    // cria aluno
    console.log('Criando aluno...')
    const alunoResp = await axios.post(`${base}/usuarios`, { nome: 'Aluno Teste', email: `aluno${Date.now()}@ex.com`, senha: 'Abc@12345', tipo: 'aluno' })
    const aluno = alunoResp.data
    console.log('Aluno:', aluno.id)

    // cria categoria
    console.log('Criando categoria...')
    const catResp = await axios.post(`${base}/categorias`, { nome: 'Programação' })
    const categoria = catResp.data
    console.log('Categoria:', categoria.id)

    // cria curso
    console.log('Criando curso...')
    const cursoResp = await axios.post(`${base}/cursos`, { titulo: 'Introdução a TypeScript', descricao: 'Curso teste', cargaHoraria: 20, categoriaId: categoria.id, instrutorId: instrutor.id })
    const curso = cursoResp.data
    console.log('Curso:', curso.id)

    // matricular aluno
    console.log('Matriculando aluno...')
    const matResp = await axios.post(`${base}/matriculas`, { alunoId: aluno.id, cursoId: curso.id })
    const matricula = matResp.data
    console.log('Matricula criada:', matricula.id)

    console.log('Fluxo de teste concluído com sucesso')
    process.exit(0)
  } catch (error: any) {
    console.error('Erro no fluxo de teste:', error?.response?.data || error.message || error)
    process.exit(1)
  }
})()
