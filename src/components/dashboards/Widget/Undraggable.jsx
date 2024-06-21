/**
 * @param {import('react').PropsWithChildren} props
 */
export default function Undraggable(props) {
  const { children } = props;

  return <div className='do-not-drag-me size-full cursor-default'>{children}</div>;
}
