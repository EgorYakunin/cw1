"use client";

import Button from "@/components/std/Button";
import Spacer from "@/components/std/Spacer";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
	const { setTheme } = useTheme();

	return (
		<div>
			<Button onClick={() => setTheme("light")}>Light</Button>
			<Spacer left={1}/>
			<Button secondary onClick={() => setTheme("dark")}>Dark</Button>
		</div>
	)
}
