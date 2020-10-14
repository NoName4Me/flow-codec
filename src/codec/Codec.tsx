import React, { ReactNode, useCallback } from 'react';
import { IoType, CodecType } from '.';
import { generateNodeId } from '../components/Node';
import { Radiobox, Checkbox } from '../components';

export enum BaseDecodeType {
  Decode = 'decode',
  Encode = 'encode',
}

function ConfigUi({node, refresh}: {node:Codec,refresh:Function}) {
  const { isLoop, ende } = node.config;
  
  const handleChange = useCallback(
    (val)=> {
      node.handleChange.call(node, val);
      refresh();
    },
    [node.handleChange],
  )
  return (
    <div className="JsonCodec">
      <Radiobox
        label="编解码"
        value={ende}
        options={['decode', 'encode']}
        onChange={handleChange}
      />
      {ende === BaseDecodeType.Decode && <Checkbox label="循环解码" value={isLoop} onChange={handleChange} />}
    </div>
  );
}

class Codec {
  id: string;
  type: CodecType;
  input: IoType;
  output: IoType;
  config: any;
  ConfigUi: (props:any)=>JSX.Element;
  constructor(id: string = generateNodeId(), type: CodecType=CodecType.JsonCodec) {
    this.id = id;
    this.type = type;
    this.input = '';
    this.output = '';
    this.config = {};
    this.ConfigUi = ConfigUi;
  }
  run(input?: IoType){
    return '' as IoType;
  };
  handleChange(val:any) {

  }
}

export default Codec;
