import React from "react"
import styled,{css} from "styled-components"
import {MdDone,MdDelete} from "react-icons/md"
import { useTodoDispatch } from "../TodoContext"


const Text = styled.div`
    flex:1;
    font-size:21px;
    color: #495057;
    ${prop => prop.done && css`
        color: #ced4da;
    `}
`

const CheckCircle = styled.div` 
    width:32px;
    height:32px;
    border-radius:16px;
    border: 1px solid #dee2e6;
    color:#dee2e6;
    font-size: 24px;
    display:flex;
    align-items:center;
    justify-content:center;
    margin-right:20px;
    cursor:pointer;
    ${prop => prop.done && css`
        border: 1px solid #20c997;
        color : #20c997;
    `}

`

const Remove = styled.div` 
    opacity:0;
    display:flex;
    align-items:center;
    justify-content: center;
    color: #dee2e6;
    font-size:24px;
    cursor:pointer;
    &:hover {
        color : #ff6b6b;
    }
`
const TodoItemBlock = styled.div`
    display:flex;
    align-items:center;
    padding-top:12px;
    padding-bottom:12px;
    &:hover {
        ${Remove} {
            opacity:1;
        }
    }
`

export const TodoItem =  React.memo(({id,done,text}) => {
    const dispatch = useTodoDispatch();
    const onToggle = () => dispatch({
        type:'TOGGLE',
        id
    })
    const onRemove = () => dispatch({
        type:'REMOVE',
        id
    })
    return (
        <TodoItemBlock>
            <CheckCircle onClick={onToggle} done={done}>{done && <MdDone />}</CheckCircle>
            <Text done={done}>{text}</Text>
            <Remove onClick={onRemove}>
                <MdDelete />
            </Remove>
        </TodoItemBlock>
    )
})

