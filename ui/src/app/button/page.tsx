import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import Row from "@/components/std/Row";
import Button from "@/components/std/Button";

export default function ButtonsPage() {
    return (
        <Container>
            <Spacer top={1} bottom={1}>
                <h1>Button variations:</h1>
            </Spacer>
            <Row>
                <Button>Submit</Button>
                <Button secondary>Submit</Button>
                <Button outline>Submit</Button>
            </Row>
            <Spacer top={1} />
            <Row>
                <Button disabled>Submit</Button>
                <Button destructive>Submit</Button>
                <Button link>Submit</Button>
            </Row>
            <Spacer top={1} />
            <Button ghost>Submit</Button>

            <Spacer top={1} />
            <Button expand>Primary</Button>
            <Spacer top={1} />
            <Button secondary expand>
                Secondary
            </Button>
            <Spacer top={1} />
            <Button outline expand>
                Outline
            </Button>
            <Spacer top={1} />
            <Button disabled expand>
                Disabled
            </Button>
            <Spacer top={1} />
            <Button destructive expand>
                Destructive
            </Button>
            <Spacer top={1} />
            <Button link expand>
                Link
            </Button>
            <Spacer top={1} />
            <Button ghost expand>
                Ghost
            </Button>
            <Spacer top={1} />
        </Container>
    );
}
