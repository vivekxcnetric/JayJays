// import React, { useState } from 'react';
// import {
//   Slider,
//   Rail,
//   Handles,
//   Tracks,
//   Ticks,
//   GetHandleProps,
// } from 'react-compound-slider';
// import { useRange } from 'react-instantsearch';

// import './PriceSlider.css';
// import { formatNumber } from '../utils';

// function Handle({
//   domain: [min, max],
//   handle: { id, value, percent },
//   disabled,
//   getHandleProps,
// }) {
//   return (
//     <>
//       {/* Dummy element to make the tooltip draggable */}
//       <div
//         style={{
//           position: 'absolute',
//           left: `${percent}%`,
//           width: 40,
//           height: 25,
//           transform: 'translate(-50%, -100%)',
//           cursor: disabled ? 'not-allowed' : 'grab',
//           zIndex: 1,
//         }}
//         aria-hidden={true}
//         {...getHandleProps(id)}
//       />
//       <div
//         role="slider"
//         className="slider-handle"
//         aria-valuemin={min}
//         aria-valuemax={max}
//         aria-valuenow={value}
//         style={{
//           left: `${percent}%`,
//           cursor: disabled ? 'not-allowed' : 'grab',
//         }}
//         {...getHandleProps(id)}
//       />
//     </>
//   );
// }

// function convertToTicks(start, range) {
//   const domain =
//     range.min === 0 && range.max === 0
//       ? { min: undefined, max: undefined }
//       : range;

//   return [
//     start[0] === -Infinity ? domain.min : start[0],
//     start[1] === Infinity ? domain.max : start[1],
//   ];
// }

// export function PriceSlider({
//   attribute,
//   min,
//   max,
// }) {
//   const { range, start, refine, canRefine } = useRange(
//     {
//       attribute,
//       min,
//       max,
//     },
//     { $$widgetType: 'e-commerce.rangeSlider' }
//   );
//   const [ticksValues, setTicksValues] = useState(convertToTicks(start, range));
//   const [prevStart, setPrevStart] = useState(start);

//   if (start !== prevStart) {
//     setTicksValues(convertToTicks(start, range));
//     setPrevStart(start);
//   }

//   const onChange = (values) => {
//     refine(values);
//   };

//   const onUpdate = (values) => {
//     setTicksValues(values);
//   };

//   if (
//     !canRefine ||
//     ticksValues[0] === undefined ||
//     ticksValues[1] === undefined
//   ) {
//     return null;
//   }

//   return (
//     <Slider
//       mode={2}
//       step={1}
//       domain={[range.min, range.max]}
//       values={start}
//       disabled={!canRefine}
//       onChange={onChange}
//       onUpdate={onUpdate}
//       rootStyle={{ position: 'relative', marginTop: '1.5rem' }}
//       className="ais-RangeSlider"
//     >
//       <Rail>
//         {({ getRailProps }) => (
//           <div className="slider-rail" {...getRailProps()} />
//         )}
//       </Rail>

//       <Tracks left={false} right={false}>
//         {({ tracks, getTrackProps }) => (
//           <div>
//             {tracks.map(({ id, source, target }) => (
//               <div
//                 key={id}
//                 className="slider-track"
//                 style={{
//                   left: `${source.percent}%`,
//                   width: `${target.percent - source.percent}%`,
//                 }}
//                 {...getTrackProps()}
//               />
//             ))}
//           </div>
//         )}
//       </Tracks>

//       <Handles>
//         {({ handles, getHandleProps }) => (
//           <div>
//             {handles.map((handle) => (
//               <Handle
//                 key={handle.id}
//                 handle={handle}
//                 domain={[range.min, range.max]}
//                 getHandleProps={getHandleProps}
//               />
//             ))}
//           </div>
//         )}
//       </Handles>

//       <Ticks values={ticksValues}>
//         {({ ticks }) => (
//           <div>
//             {ticks.map(({ id, value, percent }) => (
//               <div
//                 key={id}
//                 className="slider-tick"
//                 style={{
//                   left: `${percent}%`,
//                 }}
//               >
//                 <span style={{ color: '#e2a400', marginRight: 4 }}>$</span>
//                 {formatNumber(value)}
//               </div>
//             ))}
//           </div>
//         )}
//       </Ticks>
//     </Slider>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  Slider,
  Rail,
  Handles,
  Tracks,
  Ticks,
  GetHandleProps,
} from "react-compound-slider";
import { useRange } from "react-instantsearch";

import "./PriceSlider.css";
import { formatNumber } from "../utils";

function Handle({
  domain: [min, max],
  handle: { id, value, percent },
  disabled,
  getHandleProps,
}) {
  return (
    <>
      {/* Dummy element to make the tooltip draggable */}
      <div
        style={{
          position: "absolute",
          left: `${percent}%`,
          width: 40,
          height: 25,
          transform: "translate(-50%, -100%)",
          cursor: disabled ? "not-allowed" : "grab",
          zIndex: 1,
        }}
        aria-hidden={true}
        {...getHandleProps(id)}
      />
      <div
        role="slider"
        className="slider-handle"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{
          left: `${percent}%`,
          cursor: disabled ? "not-allowed" : "grab",
        }}
        {...getHandleProps(id)}
      />
    </>
  );
}

function convertToTicks(start, range) {
  const domain =
    range.min === 0 && range.max === 0
      ? { min: undefined, max: undefined }
      : range;

  return [
    start[0] === -Infinity ? domain.min : start[0],
    start[1] === Infinity ? domain.max : start[1],
  ];
}

export function PriceSlider({ attribute, min, max }) {
  const { range, start, refine, canRefine } = useRange(
    {
      attribute,
      min,
      max,
    },
    { $$widgetType: "e-commerce.rangeSlider" }
  );
  const [ticksValues, setTicksValues] = useState(convertToTicks(start, range));

  useEffect(() => {
    setTicksValues(convertToTicks(start, range));
  }, [start, range]);

  const onChange = (values) => {
    refine(values);
  };

  const onUpdate = (values) => {
    // No need to update state here since we're using useEffect for ticksValues
  };

  if (
    !canRefine ||
    ticksValues[0] === undefined ||
    ticksValues[1] === undefined
  ) {
    return null;
  }

  return (
    <Slider
      mode={2}
      step={1}
      domain={[range.min, range.max]}
      values={start}
      disabled={!canRefine}
      onChange={onChange}
      onUpdate={onUpdate}
      rootStyle={{ position: "relative", marginTop: "1.5rem" }}
      className="ais-RangeSlider"
    >
      <Rail>
        {({ getRailProps }) => (
          <div className="slider-rail" {...getRailProps()} />
        )}
      </Rail>

      <Tracks left={false} right={false}>
        {({ tracks, getTrackProps }) => (
          <div>
            {tracks.map(({ id, source, target }) => (
              <div
                key={id}
                className="slider-track"
                style={{
                  left: `${source.percent}%`,
                  width: `${target.percent - source.percent}%`,
                }}
                {...getTrackProps()}
              />
            ))}
          </div>
        )}
      </Tracks>

      <Handles>
        {({ handles, getHandleProps }) => (
          <div>
            {handles.map((handle) => (
              <Handle
                key={handle.id}
                handle={handle}
                domain={[range.min, range.max]}
                getHandleProps={getHandleProps}
              />
            ))}
          </div>
        )}
      </Handles>

      <Ticks values={ticksValues}>
        {({ ticks }) => (
          <div>
            {ticks.map(({ id, value, percent }) => (
              <div
                key={id}
                className="slider-tick"
                style={{
                  left: `${percent}%`,
                }}
              >
                <span style={{ color: "#e2a400", marginRight: 4 }}>$</span>
                {formatNumber(value)}
              </div>
            ))}
          </div>
        )}
      </Ticks>
    </Slider>
  );
}
