import Link from 'next/link'

type FormFooterProps = {
  label: string
  linkTitle: string
  href: string
}

export default function FooterForm({
  href,
  label,
  linkTitle: link,
}: FormFooterProps) {
  return (
    <>
      <span className="self-center text-xs text-muted-foreground">
        {label}
        <Link className="text-secondary-800 px-1 text-xs" href={href}>
          {link}
        </Link>
      </span>
    </>
  )
}
