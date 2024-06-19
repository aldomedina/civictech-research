import classNames from 'classnames'
import { CheckIcon, ChevronRightIcon } from '@heroicons/react/16/solid'

const ActivityButton = ({ style }: { style: 'check' | 'white-chevron' | 'black-chevron' }) => {
  const btnStyle = classNames('h-[30px] w-[30px] p-2 rounded-full relative overflow-hidden	grid place-content-center', {
    'bg-[#61784a]': style == 'check',
    'border border-black text-black': style == 'black-chevron',
    'border border-white text-white': style == 'white-chevron',
  })
  return (
    <div className={btnStyle}>
      {style == 'check' ? <CheckIcon className='h-5 w-5 text-success' /> : <ChevronRightIcon className='h-4 w-4 ' />}
    </div>
  )
}

export default ActivityButton
