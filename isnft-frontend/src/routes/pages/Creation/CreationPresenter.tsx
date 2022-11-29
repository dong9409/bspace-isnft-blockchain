import React, { useEffect, useRef, useState } from 'react';
import { Drawing } from '../../../components';
import './creation.css';

type Props = {
  save: Function;
  content?: any;
};

export interface Size {
  width: number;
  height: number;
}

const CreationPresenter = (props: Props) => {
  const sizeRef = useRef<HTMLDivElement>(null);
  /* Router */
  /* State */
  const { save, content } = props;
  const [size, setSize] = useState<Size>({ width: 1000, height: 1000 });
  /* Functions */
  const handleConvert = () => {};

  /* Hooks */
  useEffect(() => {
    if (sizeRef.current) {
      setSize({
        width: sizeRef.current?.clientWidth,
        height: sizeRef.current?.clientHeight,
      });
    }
  }, []);

  /* Render */
  return (
    <div className="creation-container">
      <div className="drawing-zone" ref={sizeRef}>
        <Drawing
          size={size}
          exportCanvas={handleConvert}
          save={save}
          content={content}
        />
      </div>
    </div>
  );
};

export default CreationPresenter;
