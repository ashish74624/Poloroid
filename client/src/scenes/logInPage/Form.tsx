import { useState } from "react";
import * as yup from 'yup';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../state";
import Dropzone from 'react-dropzone';

const registerSchema = yup.object().shape({
    firstName: yup.string().required('required'),
    lastName: yup.string().required('required'),
    email: yup.string().email('Email is not valid').required('required'),
    password: yup.string().required('required'),
    location: yup.string().required('required'),
    occupation: yup.string().required('required'),
    picture: yup.string().required('required'),
});

const loginSchema = yup.object().shape({
    email: yup.string().email('Email is not valid').required('required'),
    password: yup.string().required('required'),
});

const initialValueRegister ={
    firstName :"",
    lastName :"",
    email :"",
    password :"",
    location :"",
    occupation :"",
    picture :"",
};

const initialValueLogin={
    email :"",
    password :"",
}

export default function Form(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page, setPage] = useState("login");
    const isLogin = page ==="login";
}