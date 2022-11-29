import {
  BlockPicker,
  ChromePicker,
  ColorResult,
} from '@hello-pangea/color-picker';
import { Col, Row, Slider, Space } from 'antd';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PenOption } from '../Drawing';
import './tools.css';

type Props = {
  penOption: PenOption;
  setPenOption: Function;
  save: Function;
  undo: Function;
  redo: Function;
};

const Toolbox = (props: Props) => {
  const toolRef = useRef<HTMLDivElement>(null);
  /* Router */
  const navigation = useNavigate();
  /* State */
  const { save, penOption, setPenOption, undo, redo } = props;
  const [mode, setMode] = useState('PEN');
  const [isColor, setIsColor] = useState(false);
  const [color, setColor] = useState('#000');
  const [weight, setWeight] = useState(5);
  /* Functions */
  const handleSave = () => {
    save();
  };
  const handleMode = (target: any) => {
    setMode(target);
  };

  const handleColor = () => {
    handleMode('PEN');
    setIsColor(!isColor);
    setPenOption({ ...penOption, globalCompositeOperation: 'source-over' });
  };

  const changeColor = (
    color: ColorResult,
    e: React.MouseEvent<Element, MouseEvent> | undefined
  ) => {
    e!.preventDefault();
    e!.stopPropagation();
    handleMode('PEN');
    const { hex } = color;
    setColor(hex);
    setPenOption({ ...penOption, globalCompositeOperation: 'source-over' });
    // console.log(event);
  };

  const handleEraser = () => {
    handleMode('ERASER');
    setPenOption({ ...penOption, globalCompositeOperation: 'destination-out' });
  };

  const handleWeight = (newValue: number) => {
    setWeight(newValue);
  };

  const handleInputWeight = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(Number(e.target.value));
  };

  const handleRedo = () => {
    redo();
  };
  const handleUndo = () => {
    undo();
  };

  /* Hooks */
  useEffect(() => {
    setPenOption({ ...penOption, strokeStyle: color });
  }, [color]);

  useEffect(() => {
    setPenOption({ ...penOption, lineWidth: weight });
  }, [weight]);

  /* Render */

  return (
    <div className="tools-box" ref={toolRef}>
      <div
        className="tool"
        onClick={handleColor}
        style={{ backgroundColor: color }}
      >
        {isColor && (
          <div
            style={{ position: 'absolute', bottom: '100%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <ChromePicker onChange={changeColor} />
          </div>
        )}
      </div>
      <div
        className="tool"
        style={{
          color: mode === 'ERASER' ? 'red' : 'black',
        }}
        onClick={handleEraser}
      >
        <svg style={{ width: '90%', height: '90%' }} viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M16.24,3.56L21.19,8.5C21.97,9.29 21.97,10.55 21.19,11.34L12,20.53C10.44,22.09 7.91,22.09 6.34,20.53L2.81,17C2.03,16.21 2.03,14.95 2.81,14.16L13.41,3.56C14.2,2.78 15.46,2.78 16.24,3.56M4.22,15.58L7.76,19.11C8.54,19.9 9.8,19.9 10.59,19.11L14.12,15.58L9.17,10.63L4.22,15.58Z"
          />
        </svg>
      </div>
      <Space style={{ width: '180px' }}>
        <Slider
          style={{ width: '140px' }}
          min={1}
          max={300}
          onChange={handleWeight}
          value={weight}
        />
        <input
          type="text"
          className="weight-input"
          style={{ width: '40px', textAlign: 'center' }}
          value={weight}
          onChange={handleInputWeight}
        />
      </Space>
      <div className="tool" onClick={handleUndo}>
        <span className="material-symbols-outlined">undo</span>
      </div>
      <div className="tool" onClick={handleRedo}>
        <span className="material-symbols-outlined">redo</span>
      </div>
      <div className="tool" onClick={handleSave}>
        Save
      </div>
      <div className="tool" onClick={() => navigation('/creation')}>
        Exit
      </div>
    </div>
  );
};

export default Toolbox;
