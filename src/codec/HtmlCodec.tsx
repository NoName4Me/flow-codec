import Codec, { BaseDecodeType } from './Codec';
import { IoType, CodecType } from '.';

class HtmlCodec extends Codec {
  constructor(id?: string) {
    super(id, CodecType.HtmlCodec);
    this.output = '';
    this.input = '';
    this.config = {
      isLoop: false,
      ende: BaseDecodeType.Decode
    };

  }
  run(input: IoType) {
    if (!input) return '';
    this.input = input;
    let output = '';
    if (this.config.ende === BaseDecodeType.Decode) {
      const div = document.createElement('div');
      div.innerHTML = input;
      output = div.innerText || div.textContent || '';
    } else {
      const div = document.createElement('div');
      div.appendChild(document.createTextNode(input));
      output =div.innerHTML;
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

export default HtmlCodec;
