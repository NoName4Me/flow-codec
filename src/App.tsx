import React, { useState } from 'react';
import './App.scss';
import NodeLib, { LIBS } from './components/NodeLib';
import Workflow, { NodeType } from './components/Workflow';
import State from './components/State';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Head from './components/Head';
import Codec from './codec/Codec';
import { CodecMap, CodecType } from './codec';
import { DROP_WORKFLOW_ID, DROP_NODE_LIB_ID } from './utils';

const InputCodec = CodecMap.get(CodecType.Input)!;
const OutputCodec = CodecMap.get(CodecType.Output)!;
const initialNode = [new InputCodec(), new OutputCodec()];

const reorder = (list:Codec[], startIndex:number, endIndex:number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function App() {
  const [focusedNode, setFocusedNode] = useState<Codec>(null!);
  const [workflowNodeList, setWorkflowNodeList] = useState(initialNode);
  const handleFocusNode = (node: Codec) => {
    setFocusedNode(node);
  };
  const handleChange = (node: Codec) => {
    setFocusedNode(node);
  };
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    // add
    if(result.destination.droppableId === DROP_WORKFLOW_ID) {
      if(result.source.droppableId === DROP_NODE_LIB_ID) {
        const libNodeType = LIBS[result.source.index]
        const Codec = CodecMap.get(libNodeType);
        if(Codec) {
          const codec = new Codec();
          const newNodeList = Array.from(workflowNodeList);
          newNodeList.splice(-1, 0, codec);
          setWorkflowNodeList(newNodeList);
        }
        
      } else {
        const newNodeList = Array.from(workflowNodeList);
        const [removed] = newNodeList.splice(result.source.index, 1);
        newNodeList.splice(result.destination.index, 0, removed);
        setWorkflowNodeList(newNodeList);
      }
    }
    // reorder
  };

  return (
    <div className="App">
      <Head></Head>
      <main className="Body">
        <DragDropContext onDragEnd={handleDragEnd}>
          <NodeLib />
          <Workflow
            focusedNode={focusedNode}
            onNodeFocus={handleFocusNode}
            workflow={workflowNodeList}
            refreshWorkflow={() =>
              setWorkflowNodeList(workflowNodeList.map((item) => item))
            }
          />
        </DragDropContext>
        <State node={focusedNode} onChange={handleChange} />
      </main>
    </div>
  );
}

export default App;
