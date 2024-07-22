import clsx from 'clsx';

const styles: Record<string, string> = {
  n: 'top-0 left-1/2 transform -translate-x-1/2 rotate-[225deg]',
  e: 'top-1/2 right-0 transform -translate-y-1/2 rotate-[-45deg]',
  s: 'bottom-0 left-1/2 transform -translate-x-1/2 rotate-[45deg]',
  w: 'top-1/2 left-0 transform -translate-y-1/2 rotate-[135deg]',
  se: 'right-0 bottom-0',
  sw: 'left-0 bottom-0 transform rotate-90',
  ne: 'right-0 top-0 transform rotate-[270deg]',
  nw: 'left-0 top-0 transform rotate-180',
};

type ResizeHandlerPos = { handleAxis?: string };

export default function FakeResizeHandle(props: ResizeHandlerPos) {
  const { handleAxis = 'se' } = props;

  return (
    <div
      className={clsx(
        'fake-resizable-handle',
        `fake-resizable-handle-${handleAxis}`,
        'absolute size-0 border-b-16 border-l-16 border-b-neutral-400 border-l-transparent',
        styles[handleAxis],
      )}
    />
  );
}
