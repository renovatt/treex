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
        <Link className="px-1 text-xs text-primary hover:underline" href={href}>
          {link}
        </Link>
      </span>
    </>
  )
}
