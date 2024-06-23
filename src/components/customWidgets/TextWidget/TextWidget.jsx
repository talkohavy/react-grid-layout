import TopBar from '../TopBar';

export default function TextWidget(props) {
  const { textContent, fontSize, fontWeight, textAlign, justifyContent, alignItems } = props;

  return (
    <div
      className='do-not-drag-me flex h-full animate-appear cursor-default bg-white dark:bg-inherit'
      style={{ fontSize, fontWeight, textAlign, lineHeight: 'initial', justifyContent, alignItems }}
    >
      <TopBar widgetId={props.id} />

      {textContent}
    </div>
  );
}
