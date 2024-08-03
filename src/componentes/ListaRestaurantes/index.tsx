import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import { IPaginacao } from '../../interfaces/IPaginacao';
import http from '../../http';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');
  const [paginaAnterior, setPaginaAnterior] = useState('')

  const carregarDados = (url: string) => {
    http.get<IPaginacao<IRestaurante>>(url)
      .then(resposta => {
        setRestaurantes(resposta.data.results)
        setProximaPagina(resposta.data.next)
        setPaginaAnterior(resposta.data.previous)
        window.scrollTo(0, 500);
      })
      .catch(erro => {
        console.log(erro)
      })
  }
  
  useEffect(() => {
    //obter restaurantes
    carregarDados('http://localhost:8000/api/v1/restaurantes/');
    }, [])

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {<button onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}>
      Página Anterior
    </button>}
    {<button onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}>
      Próxima página
    </button>}
  </section>)

//** CRIA UM BOTÃO PARA EXPANDIR, EM VEZ DE PÁGINAS NOVAS**/
//   const verMais = () => {
//     axios.get<IPaginacao<IRestaurante>>(proximaPagina)
//     .then(resposta => {
//       console.log(resposta);
//       setRestaurantes([...restaurantes, ...resposta.data.results]);
//       setProximaPagina(resposta.data.next);
//     })
//   .catch(erro => {
//     console.log(erro);
//   })
//   }

// return (<section className={style.ListaRestaurantes}>
//   <h1>Os restaurantes mais <em>bacanas</em>!</h1>
//   {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
//   {proximaPagina && <button onClick={verMais}>
//     Ver mais
//   </button>}
// </section>)
}

export default ListaRestaurantes