import React from 'react';
import BaseWidget from '../BaseWidget';

export default function TextWidget({ widgetProps }) {
  const { textContent, fontSize, fontWeight, textAlign, justifyContent, alignItems } = widgetProps;

  return (
    <BaseWidget>
      <div
        className='do-not-drag-me flex h-full animate-appear cursor-default bg-white dark:bg-inherit'
        style={{ fontSize, fontWeight, textAlign, lineHeight: 'initial', justifyContent, alignItems }}
      >
        {textContent}
      </div>
    </BaseWidget>
  );
}
