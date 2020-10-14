import React, { useState } from 'react';
import { CodecType } from '../codec';
import Codec from '../codec/Codec';

function State({
  node,
  onChange
}: {
  node: Codec;
  onChange: (node: Codec) => void;
}) {
  const [theKey, setTheKey] = useState(0);
  const refresh = () => {
    setTheKey(Math.random())
  }
  const handleChange = (event:any) => {
    //@ts-ignore
    node.handleChange(event.target.value);
    refresh()
  }

  if (!node) {
    return null;
  }
  const Ui = node.ConfigUi;
  return (
    <div className="State">
      {node.type !== CodecType.Input && node.type !== CodecType.Output ? (
        <div className="NodeState">
          <Ui node={node} refresh={refresh}/>
        </div>
      ) : null}
      {node.type === CodecType.Input && (
        <div className="NodeInput">
          <h2>Input</h2>
          <textarea
            data-type="input"
            value={node.input}
            onChange={handleChange}
          ></textarea>
        </div>
      )}
      {node.type !== CodecType.Input && (
        <div className="NodeOutput">
          <h2>Output</h2>
          <textarea
            data-type="output"
            readOnly
            value={node.output}
            onChange={(event) => (node.output = event.target.value)}
          ></textarea>
        </div>
      )}
    </div>
  );
}

export default State;
