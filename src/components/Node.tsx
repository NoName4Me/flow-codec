import React, { MouseEventHandler } from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { CodecType } from '../codec';
import { nanoid } from 'nanoid';

export interface NodeProps {
  type: CodecType;
  id: string;
  index: number;
  shouldClone?: boolean;
  onClick?: MouseEventHandler;
  isActive?: boolean;
}

export function generateNodeId() {
  return nanoid();
}

function isForbiddenDragging(type: CodecType) {
  return type === CodecType.Output || type === CodecType.Input;
}

function getDraggingStyle(isDragging: boolean) {
  return isDragging
    ? { border: '1px dashed #3cc520', backgroundColor: 'hsl(110, 72%, 98%)' }
    : { borderStyle: 'solid' };
}

function Node({ type, id, onClick, index, shouldClone, isActive }: NodeProps) {
  // const [{ isDragging }, drag, preview] = useDrag({
  //   item: { type, id: id||generateNodeId()},
  //   collect: monitor => {
  //     const item = monitor.getItem();
  //     return {
  //       isDragging: !!monitor.isDragging(),
  //       id: item && item.id
  //     }
  //   }
  // });
  const isDraggingForbidden = isForbiddenDragging(type);
  return (
    <Draggable
      draggableId={id}
      index={index}
      isDragDisabled={isDraggingForbidden}
    >
      {(provided, snapshot) => {
        return (
          <>
            <div
              ref={provided.innerRef}
              className={'Node' + (isActive ? ' Node--active' : '')}
              data-id={id}
              onClick={onClick}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                ...provided.draggableProps.style,
                // transform: isDraggingForbidden
                //   ? 'none'
                //   : provided.draggableProps.style?.transform,
                ...getDraggingStyle(snapshot.isDragging)
              }}
            >
              {type}
            </div>
            {shouldClone && snapshot.isDragging && (
              <div className="Node Node--copied">{type}</div>
            )}
          </>
        );
      }}
    </Draggable>
  );
}

export default Node;
