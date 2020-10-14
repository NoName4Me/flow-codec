import Codec from './Codec';
import { CodecType, IoType } from '.';
import React from 'react';

class InputCodec extends Codec {
  constructor(id?: string) {
    super(id, CodecType.Input);
    this.output = '';
    this.input = '';
    this.config = {};
    this.ConfigUi = ()=><></>;
  }
  run() {
    this.output = this.input;
    return this.output;
  }
  handleChange(val: IoType) {
    this.input = val;
  }
}

export default InputCodec;
