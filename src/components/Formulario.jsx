import React, {useState,useEffect} from 'react'
import {db} from '../firebase'
import { collection, doc, addDoc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore'

const formulario = () => {
    const [nombreLibro, setNombreLibro] = useState('');
    const [nombreAutor, setNombreAutor] = useState('');
    const [listaLibros, setListaLibros] = useState([]);
    const [id,setId] = useState(0);
    const [modoEdicion, setModoEdicion] = useState(false);

    useEffect(()=>{
       
        const obtenerDatos = async() =>{
            try {
                await onSnapshot(collection(db,'libros'),(query) =>{
                    console.log('entro');
                    setListaLibros(query.docs.map((doc)=>{
                        return {...doc.data(),id:doc.id}
                    }))
                    
                })
            } catch (error) {
                console.log(error)
            }
        }
        obtenerDatos();
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

    const eliminarDatos = async id => {
        try {
            await deleteDoc(doc(db,'libros',id))
        } catch (error) {
            console.log(error)
        }
    }

    const editarDatos = item =>{
        setNombreLibro(item.nombreLibro);
        setNombreAutor(item.nombreAutor);
        editable(item);
    }

    const editable = item => {
        setNombreLibro(item.nombreLibro)
        setNombreAutor(item.nombreAutor)
        setId(item.id)
        setModoEdicion(true)
    }

    const editarLibros = async(e) =>{
        e.preventDefault();
        try {
            const docRef = doc(db,'libros',id);
            await updateDoc(docRef,{
                nombreLibro: nombreLibro,
                nombreAutor: nombreAutor
            })
            const nuevoArray = listaLibros.map(
                item => item.id === id ? {id:id, nombreLibro:nombreLibro,nombreAutor,nombreAutor}:item
            )
            setListaLibros(nuevoArray);
            setNombreAutor('')
            setNombreLibro('')
            setId('')
            setModoEdicion(false)
        } catch (error) {
            console.log(error)
        }
    }

    const cancelar = () =>{
        setModoEdicion(false)
        setNombreLibro('')
        setNombreAutor('')
        setId('')
    }

  return (
    <div className='container mt-5'>
        <h1 className='text-center'> CRUD DE LIBROS</h1>
        <hr/>
        <div className="row">
        <div className="col-8">
            <h4 className="text-center">Listado de libros</h4>
            <ul className="list-group">
                {
                    listaLibros.map(item =>(
                        <li className="list-group-item" key={item.id}>
                            <span className="lead">{item.nombreLibro} - {item.nombreAutor}</span>
                            <button onClick={()=>eliminarDatos(item.id)} className='btn btn-danger btn-sm float-end mx-2'>Eliminar</button>
                            <button onClick={()=>editarDatos(item)} className='btn btn-warning btn-sm float-end'>Editar</button>
                        </li>
                    ))
                }
            </ul>
        </div>
        <div className='col-4'>
            <h4 className='text-center'>{modoEdicion ? 'Editar libros' : 'Agrega libros'}</h4>
            <form onSubmit={modoEdicion ? editarLibros : guardarLibros}>
                <input type="text" className='form-control mb-2' onChange={(e)=>setNombreLibro(e.target.value)} value={nombreLibro} placeholder='Ingrese nombre libro' />
                <input type="text" className='form-control mb-2' onChange={(e)=>setNombreAutor(e.target.value)} value={nombreAutor} placeholder='Ingrese nombre autor' />
                {
                    modoEdicion ? (
                        <><button className='btn btn-warning btn-block'>Editar</button>
                        <button onClick={()=>cancelar()} className='btn btn-dark btn-block mx-2'>Cancelar</button></>
                    ):(<><button className='btn btn-primary btn-block'>Agregar</button></>)
                    
                }
            </form>
        </div>
        </div>    
    </div>
  )
}

export default formulario
