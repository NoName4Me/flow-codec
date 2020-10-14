import React, { useState, MouseEvent } from 'react';
import Node, { generateNodeId, NodeProps } from './Node';
import { LIBS } from './NodeLib';
import { CodecType, IoType, CodecMap } from '../codec';
import Codec from '../codec/Codec';
import { Droppable } from 'react-beautiful-dnd';
import { DROP_WORKFLOW_ID } from '../utils';

type StatusType = {
  flag: NodeStatusType;
  message: string;
  stack?: string;
};

export interface NodeType {
  type: CodecType;
  id?: string;
  input?: IoType;
  config?: { [key: string]: any };
  output?: IoType;
  status?: StatusType;
  ConfigUi: Function;
}

enum NodeStatusType {
  NotRun = 'not-run',
  Error = 'error',
  Success = 'success'
}

type WorkflowProps = {
  workflow: Codec[];
  onNodeFocus: (node: Codec) => void;
  refreshWorkflow: () => void;
  focusedNode: Codec
};

function deepClone(data: any) {
  return JSON.parse(JSON.stringify(data));
}

function Workflow({ onNodeFocus, workflow, refreshWorkflow, focusedNode }: WorkflowProps) {
  // const [collectedProps, drop] = useDrop({
  //   accept: LIBS.map((type) => type),
  //   drop(item, monitor) {
  //     const id = monitor.getItem().id;
  //     if (!workflow.find((item) => item.id === id)) {
  //       const type = item.type as CodecType;
  //       const Codec = CodecMap.get(type);
  //       if (Codec) {
  //         const codec = new Codec();

  //         workflow.splice(-1, 0, codec);
  //         setWorkflow(workflow.map((item) => item));
  //       }
  //       // Codec && setWorkflow(
  //       //   workflow.concat(new Codec())
  //       // );
  //     }
  //   }
  // });
  const handleStart = () => {
    let output = '';
    let errorIndex = -1;
    const newWorkflow: Codec[] = [];
    for (let i = 0; i < workflow.length; i++) {
      const node = workflow[i];
      try {
        output = node.run(output);
      } catch (err) {
        node.output = err.message;
        break;
      }
    }
    refreshWorkflow();
  };
  const handleFocusNode = (event: MouseEvent) => {
    const target = event.target as HTMLDivElement;
    const node = workflow.find(
      (item) => item.id === target.getAttribute('data-id')
    )!;
    onNodeFocus(node);
  };
  return (
    <Droppable droppableId={DROP_WORKFLOW_ID}>
      {(provided, snapshot) => (
        <div className="Workflow" {...provided.droppableProps}
        style={{ border: snapshot.isDraggingOver ? '1px dashed' : '' }}
        ref={provided.innerRef}>
          <div className="Workflow--Guideline"></div>
          <div className="Workflow--Body">
            <div>
              <button onClick={handleStart}>start</button>
              {/* <button onClick={handleStart}>start from error node</button> */}
            </div>

            <div
              className="Workflow--NodeList"
              
            >
              {workflow.map((node, index) => (
                <Node
                  index={index}
                  key={node.id}
                  {...node}
                  isActive={focusedNode && focusedNode.id === node.id}
                  onClick={handleFocusNode}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default Workflow;
