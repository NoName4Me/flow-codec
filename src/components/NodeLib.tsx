import React from 'react';
import Node from './Node';
import { CodecType } from '../codec';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { DROP_NODE_LIB_ID } from '../utils';

const ConfigProp = {
  EnDe: { label: '编解码' }
};

export const UrlComponentCodecNode = {
  type: CodecType.UrlComponentCodec,
  config: {
    isDecode: false,
    isLoop: true
  }
};
export const JsonCodecNode = {
  type: CodecType.JsonCodec,
  config: {
    isDecode: false,
    isLoop: false,
    isFormat: true
  }
};
export const HtmlCodecNode = {
  type: CodecType.HtmlCodec,
  config: {
    isDecode: false,
    isLoop: false
  }
};
export const LIBS = [
  CodecType.UrlComponentCodec,
  CodecType.HtmlCodec,
  CodecType.JsonCodec
];

function NodeLib() {
  return (
    <Droppable droppableId={DROP_NODE_LIB_ID} isDropDisabled={true}>
      {(provided, snapshot) => (
        <div
          className="NodeLib"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {LIBS.map((node, index) => (
            <Node key={node} shouldClone id={'LIB-' + index} type={node} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default NodeLib;
