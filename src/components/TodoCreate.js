import React,{useState} from "react"
import styled,{css} from "styled-components"
import {MdAdd} from "react-icons/md"
import { useTodoDispatch, useTodoNextId } from "../TodoContext"

const CircleButton = styled.button`
    background: #38d9a9;
    &:hover  {
        background: #63e6be;
    }

    &:active {
        background: #20c997;
    }

    z-index:5;
    cursor:pointer;
    width:80px;
    height:80px;
    display:flex;
    align-items:center;
    justify-content:center;

    position:absolute;
    left:50%;
    bottom:0px;
    transform: translate(-50%,50%);

    font-size: 60px;
    color:white;
    border-radius:50%;

    border:none;
    outline:none;
    transition: 0.125s all ease-in;
    ${props => props.open && css`
        background: #ff6b6b;
        &:hover {
            background: #ff8787;
        } 
        &:active {
            background: #fa5252;
        }

        transform: translate(-50%,50%) rotate(45deg);
    `}
`
const InsertFormPosition = styled.div`
    width:100%;
    bottom:0;
    left:0;
    position:absolute; 
`
const InsertForm = styled.form`
    background:#f8f9fa;
    padding:32px;
    padding-bottom:72px;
    border-bottom-left-radius:16px;
    border-bottom-right-radius:16px;
    border: 1px soild #e9ecef;


`

const Input = styled.input`
    padding:12px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    width:100%;
    outline:none;
    font-size:18px;
    box-sizing : border-box;
`
export const TodoCreate = React.memo(() => {
    const [open,setOpen] = useState(false);
    const [value,setValue] = useState('');
    const dispatch = useTodoDispatch()
    const nextId = useTodoNextId()
    
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type:'CREATE',
            todo: {
                id:nextId.current,
                text:value,
                done:false
            }
        })
        nextId.current += 1;
        setValue('')
        setOpen(false)
    }
    const onChange = (e) => {
        return setValue(e.target.value)
    }
    const onToggle = () => {
        return setOpen(!open)
    }
    return (
        <>
            {open && 
            <InsertFormPosition>
                <InsertForm onSubmit={onSubmit}>
                    <Input value={value} onChange={onChange} placeholder="Please Enter after input todo" autoFocus/>
                </InsertForm>
            </InsertFormPosition>}
            <CircleButton onClick={onToggle} open={open}>
                <MdAdd />
            </CircleButton>
        </>

    )
})