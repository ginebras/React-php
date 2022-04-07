import React,{useState,useEffect} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal,ModalBody,ModalFooter,ModalHeader } from "reactstrap";
import axios from 'axios';

function App() {
  
  const baseUrl="http://localhost/pruebitasReact/backend/";
  const [data,setData]=useState([]);
  const [modalState,setModal]=useState(false);
  const [editModal,modalEdit]=useState(false);
  const [editFrame,frameEdit]=useState({
    id:'',
    nombre:"",
    lanzamiento:'',
    desarrollador:''
  })
  const [frame,setFrame]=useState({
    id:'',
    nombre:"",
    lanzamiento:'',
    desarrollador:''
  });

  const handleFrame=e=>{
    const {name,value}=e.target;
    setFrame((prevState)=>({
      ...prevState,
      [name]:value
    }))
  }

  const handleModal=()=>{
    setModal(!modalState);
  }

  const peticionGetall=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    })
  }

  const peticionPost=async()=>{
    var f=new FormData();
    f.append("nombre",frame.nombre);
    f.append("lanzamiento",frame.lanzamiento);
    f.append("desarrollador",frame.desarrollador);
    f.append("METHOD","POST");
    await axios.post(baseUrl,f)
    .then(response=>{
      handleModal();
      peticionGetall();
    })
  }

  const handleEdit=(frame,caso)=>{
    frameEdit({
      id:frame.id,
      nombre:frame.nombre,
      lanzamiento:frame.lanzamiento,
      desarrollador:frame.desarrollador
    });

    modalEdit(!editModal);
  }

  const peticionPut=async()=>{
    var f=new FormData();
    f.append("id",editFrame.id);
    f.append("nombre",editFrame.nombre);
    f.append("lanzamiento",editFrame.lanzamiento);
    f.append("desarrollador",editFrame.desarrollador);
    f.append("METHOD","PUT");
    axios.post(baseUrl,f)
    .then(response=>{
      modalEdit(!editModal);
      peticionGetall();
      console.log(response);
    })
  }

  const handleEditChange=e=>{
    const {name,value}=e.target;
    frameEdit((prevState)=>({
      ...prevState,
      [name]:value
    }))
  }

  const handleDelete=async(frame)=>{
    var f=new FormData();
    f.append("id",frame.id);
    f.append("METHOD","DELETE");
    axios.post(baseUrl,f)
    .then(response=>{
      peticionGetall();
    })
  }

  useEffect(()=>{
    peticionGetall();
  },[])

  return (
    <div>
      <button className="btn btn-primary" onClick={()=>handleModal()}>INSERTAR</button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th> ID </th>
            <th> NOMBRE </th>
            <th> LANZAMIENTO </th>
            <th> DESARROLLADOR </th>
          </tr>
        </thead>
        <tbody>
          {data.map(frame=>(
            <tr key={frame.id}>
              <td>{frame.id}</td>
              <td>{frame.nombre}</td>
              <td>{frame.lanzamiento}</td>
              <td>{frame.desarrollador}</td>
              <td>
                <button className="btn btn-primary" onClick={()=>handleEdit(frame)}>EDITAR</button>
                <button className="btn btn-danger" onClick={()=>handleDelete(frame)}>ELIMINAR</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>



      <Modal isOpen={modalState}>
        <ModalHeader>AGREGAR FRAMEWORK</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre:</label><br/>
            <input type="text" className="form-control" name="nombre" onChange={handleFrame}/><br/>

            <label >Lanzamiento:</label><br/>
            <input type="text" className="form-control" name="lanzamiento"onChange={handleFrame}/><br/>

            <label >Desarrollador:</label><br/>
            <input type="text" className="form-control" name="desarrollador" onChange={handleFrame}/><br/>
          </div>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionPost()}>AGREGAR</button>
            <button className="btn btn-danger" onClick={()=>handleModal()}>CANCELAR</button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    
      <Modal isOpen={editModal}>
        <ModalHeader>EDITAR FRAMEWORK</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre:</label><br/>
            <input type="text" className="form-control" name="nombre" onChange={handleEditChange} value={editFrame.nombre}/><br/>

            <label >Lanzamiento:</label><br/>
            <input type="text" className="form-control" name="lanzamiento"onChange={handleEditChange} value={editFrame.lanzamiento}/><br/>

            <label >Desarrollador:</label><br/>
            <input type="text" className="form-control" name="desarrollador" onChange={handleEditChange} value={editFrame.desarrollador}/><br/>
          </div>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionPut()}>AGREGAR</button>
            <button className="btn btn-danger" onClick={()=>modalEdit(!editModal)}>CANCELAR</button>
          </ModalFooter>
        </ModalBody>
      </Modal>

    </div>
  );
}

export default App;
