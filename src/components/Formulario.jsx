import { addDoc, collection } from 'firebase/firestore';
import React, {useState,useEffect} from 'react'
import {db} from '../firebase'
import { collection, doc, addDoc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore'

const formulario = () => {
    const [nombreLibro, setNombreLibro] = useState('');
    const [nombreAutor, setNombreAutor] = useState('');
    const [listaLibros, setListaLibros] = useState([]);

    useEffect(()=>{
        const obtenerDatos = async() =>{
            try {
                await onSnapshot(collection(db,'libros'),(query) =>{
                    setListaLibros(query.docs.map((doc)=>({...doc.data(),id:doc.id})))
                })
            } catch (error) {
                console.log(error)
            }
            obtenerDatos();
        }
    },[])

    const guardarLibros = async(e) =>{
        e.preventDefault();
        try {
            const data = await addDoc(collection(db, 'libros'),{
                nombreLibro: nombreLibro,
                nombreAutor: nombreAutor
            })
            setListaLibros([...listaLibros,{
                nombreLibro: nombreLibro,
                nombreAutor: nombreAutor,
                id: data.id
            }])
            setNombreLibro('');
            setNombreAutor('');
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='container mt-5'>
        <h1 className='text-center'> CRUD DE LIBROS</h1>
        <hr/>
        <div className="row">
        <div className="col-8">
            <h4 className='text-center'>Listado de libros</h4>
            <ul className='list-group'>
                <li className='list-group-item'>
                    <span className='lead'>test</span>
                    <button className='btn btn-danger btn-sm float-end mx-2'>Eliminar</button>
                    <button className='btn btn-warning btn-sm float-end'>Editar</button>
                </li>
            </ul>
        </div>
        <div className='col-4'>
            <h4 className='text-center'>agregar libros</h4>
            <form onSubmit={guardarLibros}>
                <input type="text" className='form-control mb-2' onChange={(e)=>setNombreLibro(e.target.value)} value={nombreLibro} placeholder='Ingrese nombre libro' />
                <input type="text" className='form-control mb-2' onChange={(e)=>setNombreAutor(e.target.value)} value={nombreAutor} placeholder='Ingrese nombre autor' />
                <button className='btn btn-primary btn-block'>Agregar</button>
            </form>
        </div>
        </div>    
    </div>
  )
}

export default formulario
