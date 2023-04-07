import React, { useState } from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import dummyData from "../dummyData";
import Card from "./Card";

const Main = () => {
    const [data,setData] = useState(dummyData);

    const onDragEnd = (result) => {
        const {source,destination} = result;

        //同じカラム内でのタスクの入れ替え
        const sourceCollIndex = data.findIndex((e) =>e.id === source.droppableId);
        const sourceCol = data[sourceCollIndex];
    };

    return (
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
                                                <Card>{task.title}</Card>
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
    );
};

export default Main;