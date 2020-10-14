import Codec, { BaseDecodeType } from './Codec';
import { IoType, CodecType } from '.';



class UrlComponentCodec extends Codec {
  constructor(id?: string) {
    super(id, CodecType.UrlComponentCodec);
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
      if(this.config.isLoop) {
        this.output = this.input;
        let pre;
        do{
          pre = this.output;
          this.output = decodeURIComponent(pre)
        }while(this.output === pre)
        output = this.output;
      } else {
        output =  decodeURIComponent(this.input);
      }
    } else {
      output =  encodeURIComponent(this.input);
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

export default UrlComponentCodec;
