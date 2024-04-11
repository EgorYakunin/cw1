import Container from "@/components/std/Container";
import Button from "@/components/std/Button";
import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";
import Card from "@/components/std/Card";
import Investment from "./Investment";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import axios from "axios";
import { auth_config, default_url } from "@/utils/axios_config";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import Charts from "./charts";
import ExcelExport from "./excel";

type user = {
  email: string;
};

type investment = {
  id: number;
  attributes: {
    amount: number;
    status: "pending" | "occupied" | "archived";
    percent: 10;
    issue_date: string;
    closure_date: string;
    createdAt: Date;
    currency: "eur" | "rub" | "usd";
  };
};

export default async function InvestmentsPage() {
  const cookie_storage = cookies();
  const user_cookie = cookie_storage.get("user")?.value;

  if (!user_cookie) {
    return redirect("/login");
  }

  const user = JSON.parse(user_cookie);

  const data = (
    await axios.get(
      `${default_url}/investors?populate=deep&filters[email][$eq]=${user.attributes.email}`,
      auth_config
    )
  ).data.data[0].attributes;

  const investments_list = data.investments.data.map(
    (investment: investment) => {
      const investment_data = investment.attributes;

      return (
        <>
          <Investment
            id={investment.id}
            currency={investment_data.currency}
            amount={investment_data.amount}
            procent={investment_data.percent}
            investor={user.attributes.full_name}
            status={investment_data.status}
            date_from={investment_data.issue_date}
            date_to={investment_data.closure_date}
          />
          <Spacer top={2} />
        </>
      );
    }
  );

  const multiplyer = {
    rub: 0.01,
    eur: 0.9,
    usd: 1,
  };

  const charts_data = data.investments.data.map((investment: investment) => {
    return {
      amount:
        multiplyer[investment.attributes.currency] *
        investment.attributes.amount,
      status: investment.attributes.status,
      id: investment.id,
    };
  });

  return (
    <Container>
      <h1>My investments</h1>
      <Spacer top={1} />
      <Row gap={1}>
        <Button href="/investment/new">Add investment</Button>
        <ExcelExport download_data={charts_data} />
      </Row>
      <Spacer top={3} />
      {charts_data.length > 0 && (
        <>
          <Charts charts_data={charts_data} />
          <Spacer top={3} />
        </>
      )}
      {investments_list.length > 0 && (
        <>
          <h1>Investments history</h1>
          <Spacer top={1} />
          {investments_list}
        </>
      )}
    </Container>
  );
}
