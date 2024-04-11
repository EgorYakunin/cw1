import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import Notification from "./Notification";

export default function NotificationsPage() {
	return (
		<Container> 
			<h1>My notifications</h1>
			<Spacer top={1}/>
			<Notification
				text="this is your first notification"
				date="21.11.2024"
			/>
		</Container>
	)
}
