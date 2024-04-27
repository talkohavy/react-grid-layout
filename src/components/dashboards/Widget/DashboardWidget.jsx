import { useMemo } from 'react';
import Box from '../Box';
import { widgetsMapper } from './WidgetsMapper';

export default function DashboardWidget({ widgetProps, gapBetweenWidgets }) {
  const Widget = useMemo(() => widgetsMapper[widgetProps.type], [widgetProps.type]);

  return (
    <div className='flex size-full flex-1 cursor-move bg-transparent' style={{ padding: gapBetweenWidgets }}>
      <Box className='flex size-full flex-col overflow-hidden bg-white hover:bg-slate-100 dark:bg-[#383838]'>
        <div className='do-not-drag-me contents'>
          <Widget widgetProps={widgetProps} />
        </div>
      </Box>
    </div>
  );
}
