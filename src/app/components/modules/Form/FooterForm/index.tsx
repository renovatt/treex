import Link from 'next/link'
import { FormFooterProps } from './types'

export default function FooterForm({
  href,
  label,
  linkTitle: link,
}: FormFooterProps) {
  return (
    <>
      <span className="self-center text-xs text-primary-800">
        {label}
        <Link className="px-1 text-xs text-secondary-800" href={href}>
          {link}
        </Link>
      </span>
    </>
  )
}
