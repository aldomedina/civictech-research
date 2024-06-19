'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function getRoute(path: string) {
  let parts = path.split('/')
  if (parts[parts.length - 1] === 'assessment') {
    parts.pop()
  }
  return parts.join('/')
}

const Breadcrumbs = () => {
  const pathname = usePathname()
  const paths = pathname.split('/').filter((path) => path)

  return (
    <nav className='font-mono text-xs opacity-70 uppercase'>
      {paths.map((path, index) => {
        const isLast = index === paths.length - 1
        const href = getRoute('/' + paths.slice(0, index + 1).join('/'))
        return (
          <span key={index}>
            <Link href={href}>
              <span className={`uppercase ${isLast ? 'font-semibold' : 'font-light'}`}>{path}</span>
            </Link>
            {!isLast && ' / '}
          </span>
        )
      })}
    </nav>
  )
}

export default Breadcrumbs
