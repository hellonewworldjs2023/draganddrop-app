import React, { useState } from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import dummyData from "../dummyData";
import Card from "./Card";
import CreateCard from "./CreateCard";
import {v4 as uuidv4} from "uuid";

const Main = () => {
    const [data,setData] = useState(dummyData);
    const [inputText,setInputText] = useState("");
    const [update,setUpdata] = useState(false);
    
    const onDragEnd = (result) => {
        const {source,destination} = result;

        //別のカラムにタスクが移動したとき
        if(source.droppableId !== destination.droppableId){
            const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
            const destinationColIndex = data.findIndex(
                (e) =>e.id === destination.droppableId
            );
            const sourceCol = data[sourceColIndex];
            const destinationCol = data[destinationColIndex];
            
            //配列のコピーを取る
            const sourceTask = [...sourceCol.tasks];
            const destinationTask = [...destinationCol.tasks];

            //動かし始めたタスクを削除
            const [removed] = sourceTask.splice(source.index, 1);
            
            //動かした後のカラムにタスクを追加
            destinationTask.splice(destination.index, 0, removed);

            data[sourceColIndex].tasks = sourceTask;
            data[destinationColIndex].tasks = destinationTask;

            setData(data);
        }else{
            //同じカラム内でのタスクの入れ替え
            const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
            const sourceCol = data[sourceColIndex];
            
            //配列のコピーを取る
            const sourceTask = [...sourceCol.tasks];

            //タスクを削除
            const [removed] = sourceTask.splice(source.index, 1);
            //タスクを追加
            sourceTask.splice(destination.index, 0, removed);

            data[sourceColIndex].tasks = sourceTask;

            setData(data);
        }        
    };

    const removeCard = (id) => {

        //配列のコピーを取る
        const cloneData = [...data];

        //コピーした配列からカードを削除する
        cloneData.forEach((section) => {
            section.tasks = section.tasks.filter((task) => task.id !== id);
            }
        );

        //コピーから本来の配列に代入する
        setData(cloneData);     
    }

    const createCard = (e) =>{
        e.preventDefault(); 

        const firstCol = data[0];    

        //配列のコピーを取る
        const sourceTask = [...firstCol.tasks];

        //代入する箇所の定義
        const addIndex = firstCol.tasks.length;

        //代入するオブジェクトの定義
        const adding = {id:uuidv4(),title:inputText};
        
        //配列に値を代入する 
        sourceTask.splice(addIndex, 0, adding);
        data[0].tasks = sourceTask;

        setData(data);

        //入力した文字を消す
        const cardName = document.getElementsByClassName("card-name")[0];
        cardName.value = "";

        //画面の強制再レンダリング
        setUpdata(update?false:true);
    }

    const handleChange = (e) => {
        setInputText(e.target.value);
             
    }

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="trello">
                    {data.map((section) => (
                        <Droppable key={section.id} droppableId={section.id}>
                            {(provided) => (
                            <div className="trello-section" 
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                            <div className="trello-section-title">{section.title}</div>
                                <div className="trello-section-content">
                                    {section.tasks.map((task,index) => (
                                        <Draggable
                                            draggableId={task.id}
                                            index={index}
                                            key={task.id}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        ...provided.draggableProps.style,
                                                        opacity:snapshot.isDragging ? "0.3":"1",
                                                    }}
                                                >
                                                    <Card onClick={()=> removeCard(task.id)} id={task.id}>{task.title}</Card>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}   
                                </div>
                            </div>

                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
            <div className="crate-card">
                <CreateCard onClick={createCard} handleChange={handleChange}/>
            </div>
            
        </>
    );
};

export default Main;