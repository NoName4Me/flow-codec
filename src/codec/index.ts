/*
1. encodeURIComponent
2. JSON.stringify/parse
3. HTMLEncode
4. Base64
 */

import JsonCodec from "./JsonCodec";
import Codec from "./Codec";
import InputCodec from "./InputCodec";
import OutputCodec from "./OutputCodec";
import HtmlCodec from './HtmlCodec'
import UrlComponentCodec from './UrlComponentCodec'

export enum CodecType {
  HtmlCodec = 'HtmlCodec',
  JsonCodec = 'JsonCodec',
  UrlComponentCodec = 'UrlComponentCodec',
  UrlCodec = 'UrlCodec',
  Input = 'Input',
  Output = 'Output',
}

export type IoType = string;



function loop<T>(fn: Function, input: T) {
  let result = input;
  do {
    result = loop(fn, result);
  } while (result !== input);
  return result;
}

export const CodecMap = new Map<CodecType, typeof Codec>();
CodecMap.set(CodecType.JsonCodec, JsonCodec);
CodecMap.set(CodecType.Input, InputCodec);
CodecMap.set(CodecType.Output, OutputCodec);
CodecMap.set(CodecType.HtmlCodec, HtmlCodec);
CodecMap.set(CodecType.UrlComponentCodec, UrlComponentCodec);
