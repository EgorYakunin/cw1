"use client";
import Container from "@/components/std/Container";
import Card from "@/components/std/Card";
import Input from "@/components/std/Inputs/Input";
import PasswordInput from "@/components/std/Inputs/PasswordInput";
import PhoneInput from "@/components/std/Inputs/PhoneInput";
import Row from "@/components/std/Row";
import Button from "@/components/std/Button";
import Spacer from "@/components/std/Spacer";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../auth.module.css";
import { auth_config, default_url } from "@/utils/axios_config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";

export default function RegisterPage() {
  const router = useRouter();
  const user = getCookie("user");

  useEffect(() => {
    if (user) {
      router.push("/investment");
    }
  }, [user]);

  const [form_data, set_form_data] = useState({
    email: "",
    password: "",
    inn: "",
    phone: "",
    full_name: "",
  });
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

  async function handle_submit() {
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

    // WARNING: TRASH CODE
    //@ts-ignore
    const phone = document.querySelector('input[name="phone"]').value;
    set_form_data((prev) => {
      return { ...prev, phone };
    });

    // submit
    console.log(form_data);

    if (form_data.phone) {
      const send_data = {
        data: {
          ...form_data,
          inn: Number(form_data.inn),
        },
      };

      const result = await axios.post(
        `${default_url}/investors`,
        send_data,
        auth_config
      );

      if (result.status == 200) {
        setCookie("user", result.data.data);
        router.push("/investment");
      }
    }
  }

  return (
    <Container>
      <Card className={styles.card}>
        <h1>Create an account</h1>
        <Spacer top={2} />
        <Input
          name="full_name"
          label="Full name"
          onChange={handle_change}
          //@ts-ignore
          error={errors["full_name"]}
        />
        <Spacer top={1} />
        <Input
          name="inn"
          label="INN"
          type="tel"
          onChange={handle_change}
          //@ts-ignore
          error={errors["inn"]}
        />
        <Spacer top={1} />
        <Input
          name="email"
          label="Email"
          onChange={handle_change}
          //@ts-ignore
          error={errors["email"]}
        />
        <Spacer top={1} />
        <PhoneInput
          name="phone"
          label="Phone"
          onChange={handle_change}
          //@ts-ignore
          error={errors["phone"]}
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
          <Link href="/login">
            <Button secondary>Log in</Button>
          </Link>
          <Button onClick={handle_submit}>Register</Button>
        </Row>
      </Card>
      <Spacer top={20} />
    </Container>
  );
}
