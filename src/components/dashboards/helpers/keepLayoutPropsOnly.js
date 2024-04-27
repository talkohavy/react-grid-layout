const keyWhitelist = ['i', 'w', 'h', 'x', 'y'];

function keepLayoutPropsOnly(layoutWithData) {
  const layoutOnly = [];
  layoutWithData.forEach((widget) => {
    const widgetPosition = {};
    for (const key in widget) {
      if (keyWhitelist.includes(key)) widgetPosition[key] = widget[key];
    }
    layoutOnly.push(widgetPosition);
  });

  return layoutOnly;
}

export { keepLayoutPropsOnly };
