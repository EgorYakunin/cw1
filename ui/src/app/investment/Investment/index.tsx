import Spacer from "@/components/std/Spacer";
import Card from "@/components/std/Card";
import Button from "@/components/std/Button";
import Row from "@/components/std/Row";
import PersonIcon from "./personIcon";
import Link from "next/link";

type props = {
  id: number;
  currency: "eur" | "rub" | "usd";
  amount: number;
  investor?: string;
  status: "pending" | "occupied" | "archived";
  procent: number;
  date_from: string;
  date_to: string;
};

export default function Investment(props: props) {
  const currency_sybol = {
    usd: "$",
    rub: "₽",
    eur: "€",
  };

  return (
    <Link href={"/investment/" + props.id.toString()}>
      <Card>
        <Row>
          <h1>
            {currency_sybol[props.currency]}
            {props.amount}
          </h1>
          <p>{props.status}</p>
        </Row>

        {props.investor && (
          <>
            <Spacer top={1} />
            <Button outline expand>
              <Row>
                <PersonIcon />
                <p>{props.investor}</p>
              </Row>
            </Button>
          </>
        )}

        <Spacer top={2} />
        <Row>
          <p>% per year</p>
          <p>{props.procent}</p>
        </Row>
        <Spacer top={0.5} />
        <Row>
          <p>issue date</p>
          <p>{props.date_from}</p>
        </Row>
        <Spacer top={0.5} />
        <Row>
          <p>payment date</p>
          <p>{props.date_to}</p>
        </Row>
      </Card>
    </Link>
  );
}
