import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react";

interface ActiveProps extends LinkProps {
//   children: ReactElement;
  activeClass: string;
  text: string;
}

export default function ActiveLink({
//   children,
  activeClass,
  text,
  ...rest
}: ActiveProps) {
  const { asPath } = useRouter(); // se tiver o path: /

  const className = asPath === rest.href ? activeClass : "";
  return (
    <Link {...rest} className={className}>
      {text}
    </Link>
  );
}
