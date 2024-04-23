import React, { useMemo } from 'react';
import { widgetsMapper } from './WidgetsMapper';

export default function DashboardWidget({ widgetProps }) {
  const Widget = useMemo(() => widgetsMapper[widgetProps.type]?.renderer, [widgetProps.type]);

  return <Widget widgetProps={widgetProps} />;
}
