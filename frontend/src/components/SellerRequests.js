import React, { useState, useContext } from "react";
import "./SellerRequests.css";
import { Card, Button } from "react-bootstrap";
import { GlobalState } from "../GlobalState";

function SellerRequests() {
	const [response, setResponse] = useState("");
	const [status, setStatus] = useState("");

	const state = useContext(GlobalState);
	setResponse(state.globalUser.admin_service);
	console.log("in login method");
	console.log(response);

	Promise.all([
		fetch("http://localhost:3001/CityVille/Login"),
		fetch("http://localhost:3001/CityVille/getRole"),
	])
		.then(function (responses) {
			// Get      a JSON object from each of the responses
			return Promise.all(
				responses.map(function (response) {
					return response.json();
				})
			);
		})
		.then(function (data) {
			// Log the data to the console
			// You would do something with both sets of data here
			console.log("login response", data[0]);
			console.log("get role response", data[1]);
		})
		.catch(function (error) {
			// if there's an error, log it
			//console.log(error);
		});

	async function update_service(id, new_status) {
		const token = localStorage["userToken"];
		console.log("id", id);
		console.log("new_status", new_status);
		//event.preventDefault()
		const res = await fetch(
			`http://localhost:3001/CityVille/updateService/${id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					token: `Bearer ${token}`,
				},
				body: JSON.stringify({
					approve_status: new_status,
				}),
			}
		);

		console.log("e", res);

		//setResponse(res);
	}

	// useEffect((e) => {
	// 	get_seller_req(e);
	// }, []);

	const responses = [
		{
			_id: "6260afc9f481f2aa958617ef",
			to_user_id: "242424242424242424242422",
			from_user_id: "130390394309430943093093",
			service_id: "6260b03ff481f2aa958617f1",
			status: "Pending",
			date: "1602442800000",
			alternate_date: "1665514800000",
		},
		{
			_id: "6260afc9f481f2aa958617ef",
			to_user_id: "242424242424242424242422",
			from_user_id: "130390394309430943093093",
			service_id: "6260b03ff481f2aa958617f1",
			status: "Pending",
			date: "1602442800000",
			alternate_date: "1665514800000",
		},
		{
			_id: "6260afc9f481f2aa958617ef",
			to_user_id: "242424242424242424242422",
			from_user_id: "130390394309430943093093",
			service_id: "6260b03ff481f2aa958617f1",
			status: "Pending",
			date: "1602442800000",
			alternate_date: "1665514800000",
		},
		{
			_id: "6260afc9f481f2aa958617ef",
			to_user_id: "242424242424242424242422",
			from_user_id: "130390394309430943093093",
			service_id: "6260b03ff481f2aa958617f1",
			status: "Approved",
			date: "1602442800000",
			alternate_date: "1665514800000",
		},
		{
			_id: "6260afc9f481f2aa958617ef",
			to_user_id: "242424242424242424242422",
			from_user_id: "130390394309430943093093",
			service_id: "6260b03ff481f2aa958617f1",
			status: "Approved",
			date: "1602442800000",
			alternate_date: "1665514800000",
		},
		{
			_id: "6260afc9f481f2aa958617ef",
			to_user_id: "242424242424242424242422",
			from_user_id: "130390394309430943093093",
			service_id: "6260b03ff481f2aa958617f1",
			status: "Rejected",
			date: "1602442800000",
			alternate_date: "1665514800000",
		},
	];

	const [requests, setRequests] = useState(null);
	const getAppointments = () => {
		///Axios.get("http://localhost:4000/api/auth/getApp").then((response) => {
		//console.log(response);
		setRequests(response);
		//}
		//);
	};
	const [filteredRequests, setfilteredRequests] = useState(null);

	const [isPending, setIsPending] = useState(null);

	const [isApproved, setIsApproved] = useState(null);

	const [isRejected, setIsRejected] = useState(null);

	const [editMode, setInEditMode] = useState(null);

	var approved = responses.filter((e) => e.approve_status === "Approved");
	var rejected = responses.filter((e) => e.approve_status === "Rejected");
	var pending = responses.filter((e) => e.approve_status === "Pending");

	/////////////////////////////////////////////////////////////////////////////////

	function clickedEdit() {
		setInEditMode(!editMode);

		if (editMode === false) {
			JSON.parse(updates);
			/////call update apiiii
			/////send in updates json
		}
	}

	////////////////////////////////////////////////////////////////////////////////////
	var updates = {};
	const handleNameInputChange = (e) => {
		console.log(e.target.value);
		updates["service_name"] = e.target.value;
	};

	const handleDescInputChange = (e) => {
		console.log(e.target.value);
		updates["description"] = e.target.value;
	};

	const handleCategoryInputChange = (e) => {
		console.log(e.target.value);
		updates["category"] = e.target.value;
	};

	const handleAddressInputChange = (e) => {
		console.log(e.target.value);
		updates["business_address"] = e.target.value;
	};
	const handlePriceInputChange = (e) => {
		console.log(e.target.value);
		updates["price"] = e.target.value;
	};

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
							<Card className="main-card" style={{ width: "70rem" }}>
								<Card.Body className="card-body" style={{ width: "60rem" }}>
									<p>
										<b>User ID: </b>
										{e.user_id}
									</p>
									<p>
										<b>Service Name: </b>
										{editMode ? (
											<form>
												<input
													type="text"
													onChange={handleNameInputChange}
													defaultValue={e.service_name}
												/>
											</form>
										) : (
											e.service_name
										)}
									</p>
									<p>
										<b>Description: </b>
										{editMode ? (
											<form>
												<input
													type="text"
													onChange={handleDescInputChange}
													defaultValue={e.description}
												/>
											</form>
										) : (
											e.description
										)}
									</p>
									<p>
										<b>Category: </b>
										{editMode ? (
											<form>
												<input
													type="text"
													onChange={handleCategoryInputChange}
													defaultValue={e.category}
												/>
											</form>
										) : (
											e.category
										)}
									</p>
									<p>
										<b>Business Address: </b>
										{editMode ? (
											<form>
												<input
													type="text"
													onChange={handleAddressInputChange}
													defaultValue={e.business_address}
												/>
											</form>
										) : (
											e.business_address
										)}
									</p>
									<p>
										<b>Price: </b>
										{editMode ? (
											<form>
												<input
													type="text"
													onChange={handlePriceInputChange}
													defaultValue={e.price}
												/>
											</form>
										) : (
											e.price
										)}
									</p>

									<div className="decision-buttons">
										{isPending === true && (
											<div className="apr-buttons">
												<Button
													onClick={() => update_service(e._id, "Approved")}
													className="apr-btn"
													variant="outline-warning"
												>
													Accept
												</Button>
												<Button
													onClick={() => update_service(e._id, "Rejected")}
													className="rej-btn"
													variant="outline-warning"
												>
													Reject
												</Button>
											</div>
										)}
										{isApproved === true && (
											<div className="apr-buttons">
												<Button
													onClick={() => update_service(e._id, "Mark Pending")}
													className="apr-btn"
													variant="outline-warning"
												>
													Mark Pending
												</Button>
												<Button
													onClick={() => update_service(e._id, "Rejected")}
													className="rej-btn"
													variant="outline-warning"
												>
													Reject
												</Button>
											</div>
										)}
										{isRejected === true && (
											<div className="apr-buttons">
												<Button
													onClick={() => update_service(e._id, "Mark Pending")}
													className="apr-btn"
													variant="outline-warning"
												>
													Mark Pending
												</Button>
												<Button
													onClick={() => update_service(e._id, "Accepted")}
													className="rej-btn"
													variant="outline-warning"
												>
													Accept
												</Button>
											</div>
										)}
										<div className="apr-buttons">
											<Button className="del-btn" variant="outline-warning">
												Delete
											</Button>
											<Button
												className="ed-btn"
												variant="outline-warning"
												onClick={() => clickedEdit()}
											>
												{editMode ? "Save" : "Edit"}
											</Button>
										</div>
									</div>
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
