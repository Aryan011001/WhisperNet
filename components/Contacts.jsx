"use client";

import React from 'react'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { /*CheckCircle,*/ RadioButtonUnchecked } from "@mui/icons-material";

const Contacts = () => {
	const [loading, setLoading] = useState(true);
	const [contacts, setContacts] = useState([]);
	const [search, setSearch] = useState("");

	const { data: session } = useSession();
	const currentUser = session?.user;


	const getContacts = async () => {
		try {
		  const res = await fetch(
			search !== "" ? `/api/users/searchContact/${search}` : "/api/users"
		  );
		  const data = await res.json();
		  setContacts(data.filter((contact) => contact._id !== currentUser._id));
		  setLoading(false);
		} catch (err) {
		  console.log(err);
		}
	  };

	useEffect(() => {
		if (currentUser) getContacts();
	}, [currentUser, search]);


	return loading ? (
		<Loader />
	) : (
		<div className='create-chat-container'>
			<input placeholder='search contact...' className='input-search' value={search}
				onChange={(e) => setSearch(e.target.value)} />

			<div className='contact-bar'>
				<div className='contact-list'>
					<p className='text-body-bold'>Select or Deselect</p>

					{contacts.map((user, index) => (
						<div
							key={index}
							className="contact"
							onClick={() => handleSelect(user)}
						>
							<RadioButtonUnchecked />
							<img
								src={user.profileImage || "/assets/person.jpg"}
								alt="profile"
								className="profilePhoto"
							/>
							<p className="text-base-bold">{user.username}</p>
						</div>
					))}

				</div>

				<button
					className="btn"

				>
					FIND OR START A NEW CHAT
				</button>
			</div>
		</div>


	)
}

export default Contacts