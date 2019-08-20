async function loadProfile() {
	var result = await fetch('http://localhost:5000/getUserDetails', {
		method: 'GET',
		mode: 'cors',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		}
	});
	let response = await result.text();
	let user = JSON.parse(response);
	if (user) {
		document.getElementById('profile-fname').value = user.firstName || '';
		document.getElementById('profile-lname').value = user.lastName || '';
		document.getElementById('profile-email').value = user.email || '';
		document.getElementById('profile-phone').value = user.phone || '';
		document.getElementById('profile-address').value = user.address || '';
		document.getElementById('profile-postCode').value = user.postalCode || '';

	}
}
async function updateProfile() {
	let fname = document.getElementById('profile-fname').value;
	let lname = document.getElementById('profile-lname').value;
	let email = document.getElementById('profile-email').value;
	let phone = document.getElementById('profile-phone').value;
	let address = document.getElementById('profile-address').value;
	let postCode = document.getElementById('profile-postCode').value;
	data = { 'email': email, 'address': address, 'firstName': fname, 'lastName': lname, 'phone': phone, 'postalcode': postCode }
	var result = await fetch('http://localhost:5000/updateProfile', {
		method: 'POST',
		mode: 'cors',
		credentials: 'include',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		}
	});
	let response = await result.text();
	let loginResponse = JSON.parse(response);
	if (loginResponse.success) {
		document.getElementById('message').innerHTML = 'Profile Updated Successfully!!!'
	}
}