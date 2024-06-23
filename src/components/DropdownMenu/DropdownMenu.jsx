import clsx from 'clsx';
import { Arrow, Content, Item, Portal, Root, Trigger } from '@radix-ui/react-dropdown-menu';

export default function DropdownMenu(props) {
  const { children, menuItems = [], className } = props;

  return (
    <Root>
      <Trigger asChild>{children}</Trigger>

      <Portal>
        <Content
          className={clsx(
            className,
            'min-w-[220px] rounded-md bg-white p-1 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slide-up data-[side=left]:animate-slide-up data-[side=right]:animate-slide-up data-[side=top]:animate-slide-up',
          )}
          sideOffset={5}
          align='start'
          side='bottom'
        >
          {menuItems.map(({ icon: Icon, text, onClick }, index) => (
            <Item
              key={index}
              className='group relative flex h-6 cursor-pointer select-none items-center justify-start gap-2 rounded-md px-1 py-4 text-sm leading-none text-neutral-950 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-neutral-100 data-[disabled]:text-neutral-50 data-[highlighted]:text-blue-600'
              onSelect={onClick}
            >
              {Icon && <Icon style={{ width: 20, height: 20 }} />}

              {text}
            </Item>
          ))}

          <Arrow className='fill-white' />
        </Content>
      </Portal>
    </Root>
  );
}
