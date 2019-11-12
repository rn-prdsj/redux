import { takeLatest, takeEvery, put, all, delay, call, select } from 'redux-saga/effects';

// select pra pegar dados do store do redux nos permite buscar informações do estado do redux 
// put para chamar o reducer passando a action addTodo utilizar a função put 
// takeEvery pega todas as ASYNC_ADD_TODO e chama a função asyncAddTodo() que é um generation
// yield para todas as funções que importar do redux saga utilizar a função yield trata acões assíncronas 
// action é um objeto que possui um type e um payload ou seja o restante das informações { type: 'ADD_TODO', payload: { text: 'Fazer café' } }
// all 

// promese ação assíncronas que obter o reultado utilizando .then 
function apiGet(text, length) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(text + ' Saga ' + length); // resultado dessa promise sucesso
            // reject(text + ' da Rocketseat'); // resultado dessa promise error 
        }, 2000); // 2000ms
    });
    // axios.get('url')
    // .then()  com sucesso 
    // .catch(error) error
}



function* asyncAddTodo(action) { // receber a action como paranmetro 
    // const response = yield call(apiGet, action.payload.text) 
    // yield delay(2000); // executa o delay 2000ms para depois executar o proximo yield 
    // yield put({ type: 'ADD_TODO', payload: { text: response } });
    // yield put({ type: 'ADD_TODO', payload: { text: action.payload.text } }); // ao inves de receber payload: { text: 'Fazer café' } recebemos o text: action.payload.text
    try {
        const todos = yield select(state => state.todos);// buscar a contagem de 'todos' que eu tenho no meu estado 
        const response = yield call(apiGet, action.payload.text, todos.length); // pra chamar ações que retonar promise utilizar call chamada // todos.length  
        console.log(response);
        yield put({ type: 'ADD_TODO', payload: { text: response } }); // sucesso 
    } catch (err) {
        yield put({ type: 'ERROR' }); // error 
    }
}

export default function* root() {
    yield all([takeLatest('ASYNC_ADD_TODO', asyncAddTodo)]);
}

// generation são funções que você consegue percorrer parte delas sem executar ela por inteiro 


// fork(), realiza uma operação não bloqueante com a função passada
// take(), pausa as operações até receber uma redux action
// race(), executa Effects simultaneamente, e cancela todos quando um efeito retorna seu resultado
// call(), executa uma função. Se essa função retornar uma Promise, ele irá pausar a Saga até a Promise ser resolvida
// put(), despacha uma redux action
// select(), executa uma função seletora que irá buscar dados do estado global do Redux
// takeLatest(), irá executar as operações recebidas, porém, irá retornar apenas o valor da última. Se a mesma operação for enviada mais de uma vez, elas serão ignoradas, exceto a última (ex: click -> loadUser, usuário clica 4 vezes no botão (ele é legal né, quer testar sua app), apenas a função enviada no último click será executada/retornado o valor, as outras serão ignoradas)
// takeEvery(), irá retornar os valores de todas as operações recebidas