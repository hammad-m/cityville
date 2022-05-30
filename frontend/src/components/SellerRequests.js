import React, { useState, useEffect } from "react";
import "./SellerRequests.css";
import { Card, Button, Row } from "react-bootstrap";

function SellerRequests() {
	const [response, setResponse] = useState([]);

	async function get_seller_req(event) {
		console.log("in login method");
		const token = localStorage["userToken"];
		//event.preventDefault()
		const data = await fetch("http://localhost:3001/CityVille/AdminServices", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				token: `Bearer ${token}`,
			},
		});

		const res = await data.json();
		console.log("eeeeeeeeeeeeeeeeeeeeee", res);
		setResponse(res);
	}

	useEffect((e) => {
		get_seller_req(e);
	}, []);

	// const responses = [
	// 	{
	// 		_id: "6260afc9f481f2aa958617ef",
	// 		to_user_id: "242424242424242424242422",
	// 		from_user_id: "130390394309430943093093",
	// 		service_id: "6260b03ff481f2aa958617f1",
	// 		status: "Pending",
	// 		date: "1602442800000",
	// 		alternate_date: "1665514800000",
	// 	},
	// 	{
	// 		_id: "6260afc9f481f2aa958617ef",
	// 		to_user_id: "242424242424242424242422",
	// 		from_user_id: "130390394309430943093093",
	// 		service_id: "6260b03ff481f2aa958617f1",
	// 		status: "Pending",
	// 		date: "1602442800000",
	// 		alternate_date: "1665514800000",
	// 	},
	// 	{
	// 		_id: "6260afc9f481f2aa958617ef",
	// 		to_user_id: "242424242424242424242422",
	// 		from_user_id: "130390394309430943093093",
	// 		service_id: "6260b03ff481f2aa958617f1",
	// 		status: "Pending",
	// 		date: "1602442800000",
	// 		alternate_date: "1665514800000",
	// 	},
	// 	{
	// 		_id: "6260afc9f481f2aa958617ef",
	// 		to_user_id: "242424242424242424242422",
	// 		from_user_id: "130390394309430943093093",
	// 		service_id: "6260b03ff481f2aa958617f1",
	// 		status: "Approved",
	// 		date: "1602442800000",
	// 		alternate_date: "1665514800000",
	// 	},
	// 	{
	// 		_id: "6260afc9f481f2aa958617ef",
	// 		to_user_id: "242424242424242424242422",
	// 		from_user_id: "130390394309430943093093",
	// 		service_id: "6260b03ff481f2aa958617f1",
	// 		status: "Approved",
	// 		date: "1602442800000",
	// 		alternate_date: "1665514800000",
	// 	},
	// 	{
	// 		_id: "6260afc9f481f2aa958617ef",
	// 		to_user_id: "242424242424242424242422",
	// 		from_user_id: "130390394309430943093093",
	// 		service_id: "6260b03ff481f2aa958617f1",
	// 		status: "Rejected",
	// 		date: "1602442800000",
	// 		alternate_date: "1665514800000",
	// 	},
	// ];

	// const [requests, setRequests] = useState(null);
	// const getAppointments = () => {
	// 	///Axios.get("http://localhost:4000/api/auth/getApp").then((response) => {
	// 	//console.log(response);
	// 	setRequests(response);
	// 	//}
	// 	//);
	// };
	const [filteredRequests, setfilteredRequests] = useState(null);

	const [isPending, setIsPending] = useState(null);

	const [isApproved, setIsApproved] = useState(null);

	const [isRejected, setIsRejected] = useState(null);

	var approved = response.filter((e) => e.approve_status === "Approved");
	var rejected = response.filter((e) => e.approve_status === "Rejected");
	var pending = response.filter((e) => e.approve_status === "Pending");

	function showApproved() {
		setIsApproved(true);
		setIsRejected(false);
		setIsPending(false);
		setfilteredRequests(approved);
	}

	function showRejected() {
		setIsApproved(false);
		setIsRejected(true);
		setIsPending(false);
		setfilteredRequests(rejected);
	}

	function showPending() {
		setIsApproved(false);
		setIsRejected(false);
		setIsPending(true);
		setfilteredRequests(pending);
	}
	return (
		<>
			<h1>Seller Requests</h1>

			<div className="buttons">
				<Button
					id="approved-button"
					variant="outline-warning"
					onClick={() => showApproved()}
				>
					{" "}
					Approved{" "}
				</Button>
				<Button
					id="rejected-button"
					variant="outline-warning"
					onClick={() => showRejected()}
				>
					Rejected{" "}
				</Button>
				<Button
					id="pending-button"
					variant="outline-warning"
					onClick={() => showPending()}
				>
					{" "}
					Pending
				</Button>
			</div>
			{filteredRequests &&
				filteredRequests.map((e) => {
					return (
						<div className="cards">
							<Card className="main-card">
								<Card.Body className="card-body">
									<p>
										<b>From User ID: </b>
										{e._id}
									</p>
									<p>
										<b>To User ID: </b>
										{e.user_id}
									</p>
								</Card.Body>
							</Card>
						</div>
					);
				})}
		</>
	);
}
export default SellerRequests;

// 	return (
// 		<div className="main-content">
// 			<h1 className=".appointments-h1">Seller Requests</h1>
// 			<div className="buttons">
// 				<Button
// 					id="approved-button"
// 					variant="outline-warning"
// 					onClick={() => showApproved()}
// 				>
// 					{" "}
// 					Approved{" "}
// 				</Button>
// 				<Button
// 					id="rejected-button"
// 					variant="outline-warning"
// 					onClick={() => showRejected()}
// 				>
// 					Rejected{" "}
// 				</Button>
// 				<Button
// 					id="pending-button"
// 					variant="outline-warning"
// 					onClick={() => showPending()}
// 				>
// 					{" "}
// 					Pending
// 				</Button>
// 			</div>

// 			{filteredRequests &&
// 				filteredRequests.map((e) => {
// 					return (
// 						<div>
// 							<div className="cards">
// 								<Card className="customCard" style={{ width: "70rem" }}>
// 									<Card.Body>
// 										<Card.Text className="card-text">
// 											{isApproved === true && (
// 												<div className="test">
// 													<p>
// 														<b>User ID: </b> {e.user_id}
// 													</p>
// 													<p>
// 														<b>Service Name: </b> {e.service_name}
// 													</p>
// 													<p>
// 														<b>Description: </b> {e.description}
// 													</p>
// 													<p>
// 														<b>Category: </b> {e.category}
// 													</p>
// 													<p>
// 														<b>Business Address: </b>{" "}
// 														{encodeURI.business_address}
// 													</p>
// 													<p>
// 														<b>Price: </b> {e.price}
// 													</p>
// 												</div>
// 											)}
// 											{isPending === true && (
// 												<div className="test">
// 													<p>
// 														<b>User ID: </b> {e.user_id}
// 													</p>
// 													<p>
// 														<b>Service Name: </b> {e.service_name}
// 													</p>
// 													<p>
// 														<b>Description: </b> {e.description}
// 													</p>
// 													<p>
// 														<b>Category: </b> {e.category}
// 													</p>
// 													<p>
// 														<b>Business Address: </b> {e.business_address}
// 													</p>
// 													<p>
// 														<b>Price: </b> {e.price}
// 													</p>
// 												</div>
// 											)}
// 											{isRejected === true && (
// 												<div className="test">
// 													<p>
// 														<b>User ID: </b> {e.user_id}
// 													</p>
// 													<p>
// 														<b>Service Name: </b> {e.service_name}
// 													</p>
// 													<p>
// 														<b>Description: </b> {e.description}
// 													</p>
// 													<p>
// 														<b>Category: </b> {e.category}
// 													</p>
// 													<p>
// 														<b>Business Address: </b> {e.business_address}
// 													</p>
// 													<p>
// 														<b>Price: </b> {e.price}
// 													</p>
// 												</div>
// 											)}
// 										</Card.Text>
// 										<div className="decision-buttons">
// 											{isPending === true && (
// 												<div className="apr-buttons">
// 													<Button className="apr-btn" variant="outline-warning">
// 														Accept
// 													</Button>
// 													<Button className="rej-btn" variant="outline-warning">
// 														Rejcet
// 													</Button>
// 												</div>
// 											)}
// 										</div>
// 									</Card.Body>
// 								</Card>
// 							</div>
// 						</div>
// 					);
// 				})}
// 		</div>
// 	);
// }
