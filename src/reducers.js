import { createSlice } from "@reduxjs/toolkit";

const estIni = {
    isbn:"",
    titulo: "",
    autor:""
};
const reducers = createSlice({
    name:"holaAPP",
    initialState: estIni,
    reducers: {
        //esto se conoce como acciones o ACTION
        setIsbn: (state, action) => {
            //el state es el estado del objeto y el action es lo que yo quiero actualizar en ese objeto
            //eso se hace por medio del payload que es la informacion con la q quiero actualizar
            console.log("--->" + action.payload);
            state.isbn = action.payload;
        },
        setTitulo: (state, action) => {
            state.titulo = action.payload;
        },
        setAutor: (state, action) => {
            state.autor = action.payload;
        }
    }
});

export const {setIsbn,setTitulo,setAutor}=reducers.actions;
export default reducers.reducer;

/**
 * Las acciones reemplazan el useState
 */