import { useMemo } from 'react';
import { Layout } from 'react-grid-layout';
import DefaultWidgetRenderer from '../DefaultWidgetRenderer';
import { WidgetsTypeToRendererMapper } from '../types';
import Undraggable from './Undraggable';

type WidgetProps = {
  type: string;
  props: any;
  widgetLayout: Layout;
  gapBetweenWidgets: number;
  widgetsTypeToRendererMapper?: WidgetsTypeToRendererMapper;
};

export default function Widget(props: WidgetProps) {
  const { type, props: widgetProps, widgetsTypeToRendererMapper, widgetLayout, gapBetweenWidgets } = props;
  const { i: id, static: isStatic } = widgetLayout;

  const CustomWidgetType = useMemo(
    () => widgetsTypeToRendererMapper?.[type!] ?? DefaultWidgetRenderer,
    [widgetsTypeToRendererMapper, type],
  );

  return (
    <div
      className='flex size-full grow basis-[0%] bg-transparent'
      style={{ padding: gapBetweenWidgets, cursor: isStatic ? 'default' : 'move' }}
    >
      <div className='relative flex size-full flex-col overflow-hidden rounded-md bg-slate-50 p-4 hover:bg-slate-100'>
        <Undraggable>
          <CustomWidgetType id={id} {...widgetProps} />
        </Undraggable>
      </div>
    </div>
  );
}
