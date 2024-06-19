import classNames from 'classnames'
import ActivityButton from './ActivityButton'
import Link from 'next/link'

interface PlatformCardProps {
  title: string
  state: boolean
}

const PlatformCard: React.FC<PlatformCardProps> = ({ title, state }) => {
  const cardStyles = classNames(
    'flex justify-between items-center p-6 rounded-md hover:bg-gray-100 transition duration-300 hover:shadow-md',
    {
      'bg-success': state,
      'border border-gray-400': !state,
    },
  )

  return (
    <Link
      className={state ? 'pointer-events-none' : ''}
      aria-disabled={state}
      tabIndex={state ? -1 : undefined}
      href={`/platform/${title.toLocaleLowerCase()}/instructions`}
    >
      <div className={cardStyles}>
        <h2
          className={classNames('text-xl font-bold uppercase text-black', {
            'text-[#61784a]': state,
          })}
        >
          {title}
        </h2>
        <ActivityButton style={state ? 'check' : 'black-chevron'} />
      </div>
    </Link>
  )
}

export default PlatformCard
