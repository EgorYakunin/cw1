"use client";
import Container from "@/components/std/Container";
import Card from "@/components/std/Card";
import Input from "@/components/std/Inputs/Input";
import PasswordInput from "@/components/std/Inputs/PasswordInput";
import Row from "@/components/std/Row";
import Button from "@/components/std/Button";
import Spacer from "@/components/std/Spacer";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../auth.module.css";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { auth_config, default_url } from "@/utils/axios_config";

export default function LoginPage() {
  const router = useRouter();
  const user = getCookie("user");

  useEffect(() => {
    if (user) {
      router.push("/investment");
    }
  }, [user]);

  const [form_data, set_form_data] = useState({ email: "", password: "" });
  const [errors, set_errors] = useState({});
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
    set_errors([]);
    if (!form_data.email) add_error("email", "Email can't be empty");
    else if (!form_data.email.includes("@"))
      add_error("email", "Please enter a valid email");
    else if (!form_data.email.includes("."))
      add_error("email", "Please enter a valid email");

    if (!form_data.password) add_error("password", "Password can't be empty");
    else if (form_data.password.length < 6)
      add_error("password", "Password should be at least 6 symbols long");

    // submit
    console.log(form_data);

    axios
      .get(
        `${default_url}/investors?filters[email][$eq]=${form_data.email}`,
        auth_config
      )
      .then((res) => {
        if (res.data.data.length == 0) {
          return add_error("email", "Account was not found.");
        }

        const user = res.data.data[0];

        if (user.attributes.password !== form_data.password) {
          return add_error("password", "Incorrect password.");
        }

        console.log(user);
        setCookie("user", user);
        router.push("/investment");
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  }

  return (
    <Container>
      <Card className={styles.card}>
        <h1>Login</h1>
        <Spacer top={2} />
        <Input
          name="email"
          label="Email"
          onChange={handle_change}
          //@ts-ignore
          error={errors["email"]}
        />
        <Spacer top={1} />
        <PasswordInput
          name="password"
          label="Password"
          onChange={handle_change}
          //@ts-ignore
          error={errors["password"]}
        />
        <Spacer top={2} />
        <Row>
          <Link href="/register">
            <Button secondary>Register</Button>
          </Link>
          <Button onClick={handle_submit}>Log in</Button>
        </Row>
      </Card>
    </Container>
  );
}
