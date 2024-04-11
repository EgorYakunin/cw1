import Spacer from "@/components/std/Spacer";
import Card from "@/components/std/Card";
import Button from "@/components/std/Button";
import Row from "@/components/std/Row";
import PersonIcon from "../Investment/personIcon";
import Link from "next/link";

export default function InvestmentPage() {
  const data: any = {};

  return (
    <>
      <Button href="/investment"> Go back</Button>
      <Card>
        <Row>
          <h1>
            {data.currency}
            {data.amount}
          </h1>
          <p>{data.status}</p>
        </Row>

        {data.investor && (
          <>
            <Spacer top={1} />
            <Button outline expand>
              <Row>
                <PersonIcon />
                <p>{data.investor}</p>
              </Row>
            </Button>
          </>
        )}

        <Spacer top={2} />
        <Row>
          <p>% per year</p>
          <p>{data.procent}</p>
        </Row>
        <Spacer top={0.5} />
        <Row>
          <p>issue date</p>
          <p>{data.date_from}</p>
        </Row>
        <Spacer top={0.5} />
        <Row>
          <p>payment date</p>
          <p>{data.date_to}</p>
        </Row>
      </Card>
    </>
  );
}
