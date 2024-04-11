import Spacer from "@/components/std/Spacer";
import Card from "@/components/std/Card";

type props = {
	text: string;
	date: string;
}

export default function Notification(props: props) {
	return (
		<Card>
			<b>{props.text}</b>
			<Spacer top={1}/>
			<p>{props.date}</p>
		</Card>
	)
}
