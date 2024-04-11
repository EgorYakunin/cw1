"use client";
import Container from "@/components/std/Container";
import Card from "@/components/std/Card";
import Input from "@/components/std/Inputs/Input";
import Row from "@/components/std/Row";
import Button from "@/components/std/Button";
import Spacer from "@/components/std/Spacer";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../new_investment.module.css";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import axios from "axios";
import { default_url, auth_config } from "@/utils/axios_config";

type new_investment = {
  currency: "usd" | "rub" | "eur" | "";
  amount: number;
  percent: number;
  issue_date: string;
  closure_date: string;
};

interface error {
  [target: string]: string;
}

export default function NewInvestment() {
  const router = useRouter();

  const user_cookie = getCookie("user");

  useEffect(() => {
    if (!user_cookie) {
      router.push("/login");
    }
  }, [user_cookie]);

  if (!user_cookie) {
    return;
  }

  const user = JSON.parse(user_cookie);

  const [form_data, set_form_data] = useState<new_investment>({
    currency: "",
    amount: 0,
    percent: 0,
    issue_date: "",
    closure_date: "",
  });
  const [errors, set_errors] = useState<error>({});
  function add_error(target: string, text: string) {
    set_errors((prev) => ({ ...prev, [target]: text }));
  }

  function handle_change() {
    //@ts-ignore
    const { name, value } = event.target;

    set_form_data((prev_form_data) => {
      return {
        ...prev_form_data,
        [name]: value,
      };
    });
  }

  function handle_submit() {
    // error validation
    set_errors({});
    const currency_array = ["usd", "rub", "eur"];
    const date_pattern = /(\d{2})\.(\d{2})\.(\d{4})/;

    if (!currency_array.includes(form_data.currency))
      add_error("currency", "Unsupported currency format");

    if (!form_data.amount) add_error("amount", "Amount can't be empty");
    if (!form_data.percent) add_error("percent", "Percent can't be empty");
    if (
      !form_data.issue_date &&
      !Date.parse(form_data.issue_date.replace(date_pattern, "$3-$2-$1"))
    )
      add_error("issue_date", "Date can't be empty");
    if (
      !form_data.closure_date &&
      !Date.parse(form_data.closure_date.replace(date_pattern, "$3-$2-$1"))
    )
      add_error("closure_date", "Date can't be empty");

    if (Object.keys(errors).length == 0) {
      const send_data = {
        data: {
          ...form_data,
          amount: Number(form_data.amount),
          percent: Number(form_data.percent),
          issue_date: new Date(
            form_data.issue_date.replace(date_pattern, "$3-$2-$1")
          ),
          closure_date: new Date(
            form_data.closure_date.replace(date_pattern, "$3-$2-$1")
          ),
          investor: user?.id,
        },
      };

      const result = axios
        .post(`${default_url}/investments`, send_data, auth_config)
        .then((res) => {
          router.replace("/investment");
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <Container>
      <Card className={styles.card}>
        <h1>New Investment</h1>
        <Spacer top={2} />
        <Input
          name="currency"
          label="Currency"
          onChange={handle_change}
          error={errors["currency"]}
        />
        <Spacer top={1} />
        <Row>
          <div>
            <b>Amount</b>
            <Spacer top={0.5} />
            <Input
              name="amount"
              type="tel"
              onChange={handle_change}
              error={errors["amount"]}
            />
          </div>
          <Spacer left={1} />
          <div>
            <b>Percent</b>
            <Spacer top={0.5} />
            <Input
              name="percent"
              type="tel"
              onChange={handle_change}
              error={errors["percent"]}
            />
          </div>
        </Row>
        <Spacer top={1} />
        <Input
          name="issue_date"
          label="Issue date"
          onChange={handle_change}
          error={errors["issue_date"]}
        />
        <Spacer top={1} />
        <Input
          name="closure_date"
          label="Closure date"
          onChange={handle_change}
          error={errors["closure_date"]}
        />
        <Spacer top={2} />
        <Row>
          <Link href="/investment">
            <Button secondary>Cancel</Button>
          </Link>
          <Button onClick={handle_submit}>Submit</Button>
        </Row>
      </Card>
      <Spacer top={10} />
    </Container>
  );
}
