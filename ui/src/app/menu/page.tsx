import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import Link from "next/link";

export default function TypePage() {
  const pages = ["login", "investment", "notifications", "register"];

  const link_list = pages.map((page) => {
    const page_title = page[0].toUpperCase() + page.slice(1);

    return (
      <Spacer top={1} key={page}>
        <Link href={page} key={page}>
          {page_title}
        </Link>
      </Spacer>
    );
  });

  return (
    <Container>
      {link_list}
      <Spacer top={3}>
        <Link href="settings">Settings</Link>
      </Spacer>
    </Container>
  );
}
