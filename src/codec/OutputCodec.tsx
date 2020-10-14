import Codec from './Codec';
import { CodecType, IoType } from '.';
import React from 'react';

class OutputCodec extends Codec {
  constructor(id?: string) {
    super(id, CodecType.Output);
    this.output = '';
    this.input = '';
    this.config = {};
    this.ConfigUi = ()=><></>;
  }
  run(input:string) {
    this.input = input;
    this.output = this.input;
    return this.output;
  }
  handleChange(val: IoType) {
    this.output = val;
  }
}

export default OutputCodec;
