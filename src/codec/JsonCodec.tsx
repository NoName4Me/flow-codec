import React, { useCallback } from 'react';
import Codec from './Codec';
import { Checkbox } from '../components';
import { Radiobox } from '../components';
import { IoType, CodecType } from '.';

enum DecodeType {
  Decode = 'JSON.parse',
  Encode = 'JSON.stringify',
  Format = '格式化'
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
    <div className="JsonCodec NodeState">
      <Radiobox
        label="编解码"
        value={ende}
        options={['JSON.parse', 'JSON.stringify', '格式化']}
        onChange={handleChange}
      />
      <Checkbox label="编解码" value={isLoop} onChange={handleChange} />
    </div>
  );
}

class JsonCodec extends Codec {
  constructor(id?: string) {
    super(id, CodecType.JsonCodec);
    this.output = '';
    this.input = '';
    this.config = {
      isLoop: false,
      ende: DecodeType.Decode
    };

    this.ConfigUi = ConfigUi;
  }
  private render() {
    const { isLoop, ende } = this.config;
    return (
      <div className="JsonCodec NodeState">
        <Radiobox
          label="编解码"
          value={ende}
          options={['JSON.parse', 'JSON.stringify', '格式化']}
          onChange={this.handleChange}
        />
      </div>
    );
  }
  run(input: IoType) {
    if (!input) return '';
    this.input = input;
    let output = '';
    if (this.config.ende === DecodeType.Decode) {
      const str = JSON.parse(input);
      output = str as string;
    } else if(this.config.ende === DecodeType.Format) {
      output = JSON.stringify(input, null, 2);
    } else {
      output = JSON.stringify(input);
    }
    this.output = output;
    return output;
  }
  handleChange(val: any) {
    const res = {} as any;
    if (typeof val === 'boolean') {
      res.isLoop = val;
    }
    if (typeof val === 'string') {
      res.ende = val;
    }
    this.config = {...this.config, ...res}
  }
}

export default JsonCodec;
