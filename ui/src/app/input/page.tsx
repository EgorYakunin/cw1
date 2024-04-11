"use client"

import { useState } from "react";

import Container from "@/components/std/Container";
import Input from "@/components/std/Inputs/Input";
import PasswordInput from "@/components/std/Inputs/PasswordInput";
import Spacer from "@/components/std/Spacer";
import Button from "@/components/std/Button";
import Row from "@/components/std/Row";
import Divider from "@/components/std/Divider";
import Checkbox from "@/components/std/Inputs/Checkbox";

type props = {
	initial_data: Object
}

function Form(props: props) {
	const [form_data, set_form_data] = useState(props.initial_data);

	function handle_change(event: any) {
		const { name, value } = event.target;

		set_form_data(prev_form_data => {
			return {
				...prev_form_data,
				[name]: value,
			};
		});
	}

	return {handle_change}
}

export default function InputPage() {
	// const {handle_change} = Form({username:"", password: ""});

    return (
        <Container>
			<Input
				name="username"
				onChange={() => {}}
			/>
			<PasswordInput
				name="password"
				onChange={() => {}}
			/>
        </Container>
    );
}
