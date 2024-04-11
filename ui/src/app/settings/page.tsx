import Container from "@/components/std/Container";
import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";
import ThemeToggle from "./ThemeToggle";
import Logout from "./Logout";

export default function SettingsPage() {
  return (
    <Container>
      <Row>
        <h2>Theme</h2>
        <ThemeToggle />
      </Row>
      <Spacer top={2} />
      <Row>
        <h2>Log out</h2>
        <Logout />
      </Row>
    </Container>
  );
}
