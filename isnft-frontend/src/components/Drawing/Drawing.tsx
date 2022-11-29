import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Size } from '../../routes/pages/Creation/CreationPresenter';
import './drawing.css';
import Toolbox from './tools/Toolbox';
import ERASER from './eraser.svg';

type Props = {
  size: Size;
  exportCanvas: Function;
  save: Function;
  content?: any;
};

interface Coordinate {
  x: number;
  y: number;
}

export interface PenOption {
  lineJoin: CanvasLineJoin;
  strokeStyle: string;
  lineWidth: number;
  globalCompositeOperation: GlobalCompositeOperation;
}

const Drawing = (props: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const point = useRef<any>([]);
  const pathsry = useRef<any>([]);
  const undoList = useRef<any>([]);

  /* Router */
  /* State */
  const { size, save, content } = props;
  const width = size.width;
  const height = size.height;
  // Mouse Coordinate
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined
  );
  // Painting status
  const [isPainting, setIsPainting] = useState(false);
  // Canvas Pen Option
  const [penOption, setPenOption] = useState<PenOption>({
    strokeStyle: 'black',
    lineJoin: 'round',
    lineWidth: 5,
    globalCompositeOperation: 'source-over',
  });

  /* Functions */
  /**
   * --
   * MouseEvent로 부터 좌표를 얻음
   * @param event
   * @returns
   */
  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop,
    };
  };

  /**
   * --
   * 선을 그림
   * @param originalMousePosition
   * @param newMousePosition
   * @returns
   */
  const drawLine = (
    originalMousePosition: Coordinate,
    newMousePosition: Coordinate
  ) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');

    if (context) {
      context.beginPath();
      context.strokeStyle = penOption.strokeStyle;
      context.lineJoin = penOption.lineJoin;
      context.lineWidth = penOption.lineWidth;

      // console.log(context);
      context.globalCompositeOperation = penOption.globalCompositeOperation;

      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      const point_ = {
        x: newMousePosition.x,
        y: newMousePosition.y,
        ...penOption,
      };
      // MouseMove Event Log
      point.current.push(point_);
      context.closePath();

      context.stroke();
    }
  };

  /**
   * --
   * MouseDownEvent Listener에 사용될 callback 함수
   */
  const startPaint = useCallback((event: MouseEvent) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      // MouseDown Event Log
      point.current.push({
        x: coordinates!.x,
        y: coordinates!.y,
        ...penOption,
      });
      setIsPainting(true);
      setMousePosition(coordinates);
    }
  }, []);

  /**
   * --
   * MouseMoveEvent Listener에 사용될 callback 함수
   */
  const paint = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition]
  );

  /**
   * --
   * MouseUpEvent Listener에 사용될 callback 함수
   */
  const exitPaint = useCallback(() => {
    // const temp = pathsry.concat(point.current);
    // setPathsry(temp);
    // setPoints([]);
    setIsPainting(false);
  }, []);

  /**
   * 저장 핸들러
   * --
   */
  const handleSave = () => {
    handleDrawPaths();
    save(pathsry.current);
    html2canvas(canvasRef.current!).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      // const pdf = new jsPDF('p', 'mm', 'a4');
      // const imgProps = pdf.getImageProperties(imgData);
      // const pdfWidth = pdf.internal.pageSize.getWidth();
      // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      // pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      // pdf.save('download.pdf');
      save({
        event_list: pathsry.current,
        file: imgData,
        thumbnail: imgData,
        content_width: size.width,
        content_height: size.height,
      });
    });
  };

  const handleDrawPaths = () => {
    if (!canvasRef.current) {
      return;
    }
    const path = pathsry.current;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);

    path.forEach((item: any) => {
      context.beginPath();
      context.moveTo(item[0].x, item[0].y);
      for (let i = 1; i < item.length; i++) {
        context.lineWidth = item[i].lineWidth;
        context.strokeStyle = item[i].strokeStyle;
        context.lineJoin = item[i].lineJoin;
        context.globalCompositeOperation = item[i].globalCompositeOperation;
        context.lineTo(item[i].x, item[i].y);
      }
      context.stroke();
    });
  };

  const handleUndo = () => {
    if (!canvasRef.current) {
      return;
    }
    const dd = pathsry.current.pop();
    undoList.current.push(dd);
    handleDrawPaths();
  };

  const handleRedo = () => {
    if (!canvasRef.current) {
      return;
    }
    if (undoList.current.length === 0) {
      return;
    }
    const dd = undoList.current.pop();
    pathsry.current.push(dd);
    handleDrawPaths();
  };

  /* Hooks */
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;

    canvas.addEventListener('mousedown', startPaint);
    canvas.addEventListener('mousemove', paint);
    canvas.addEventListener('mouseup', exitPaint);
    canvas.addEventListener('mouseleave', exitPaint);

    return () => {
      canvas.removeEventListener('mousedown', startPaint);
      canvas.removeEventListener('mousemove', paint);
      canvas.removeEventListener('mouseup', exitPaint);
      canvas.removeEventListener('mouseleave', exitPaint);
    };
  }, [startPaint, paint, exitPaint]);

  // path 이벤트를 저장하는 구간
  useEffect(() => {
    if (point.current.length === 0) {
      return;
    }
    if (isPainting) {
      return;
    }

    // MouseUp Event Log
    point.current.push({
      x: mousePosition!.x,
      y: mousePosition!.y,
      ...penOption,
    });

    pathsry.current.push(point.current);
    point.current = [];
    handleDrawPaths();
  }, [isPainting]);

  useEffect(() => {
    if (!content) {
      return;
    }
    pathsry.current = content;
    handleDrawPaths();
  }, [content]);

  /* Render */
  return (
    <div className="drawing-container">
      <canvas
        ref={canvasRef}
        height={height}
        width={width}
        className="tscanvas"
      />
      <Toolbox
        penOption={penOption}
        setPenOption={setPenOption}
        save={handleSave}
        undo={handleUndo}
        redo={handleRedo}
      />
      {/* <div className="tools-box">Tools</div>
      <div className="drawing-log">Log</div> */}
    </div>
  );
};

export default Drawing;
