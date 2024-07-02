import clsx from 'clsx';

export default function Checkbox({ isChecked, setIsChecked, label }) {
  return (
    <label className='group flex cursor-pointer items-center justify-center gap-2'>
      <div className='flex items-center justify-center'>
        <input
          type='checkbox'
          // value={isChecked} // <--- apparently you don't need value in a checkbox
          checked={!!isChecked}
          onChange={() => setIsChecked(!isChecked)}
          // eslint-disable-next-line
          className={clsx(isChecked && 'checked', 'size-0 opacity-0')}
        />

        <div className='size-6 rounded-md border border-black group-has-[input:checked]:bg-blue-400' />
      </div>

      <div>{label}</div>
    </label>
  );
}
