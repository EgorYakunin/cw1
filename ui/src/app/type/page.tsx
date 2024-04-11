import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";

export default function TypePage() {
    return (
        <Container>
            <h1>This is an H1 title</h1>
            <Spacer top={0.5} />
            <p>This is a default paragraph size</p>
            <Spacer top={1} />
        </Container>
    );
}
