function CreateInfo(text)
{
	var info = document.createElement('DIV');
	info.className = "client_info";
	info.innerHTML = text;
	return info;
}

function AddNewClientDiv(id, name, alias, email, lang, numCustLic, numProjLic, licExpDate)
{
	var newClient = document.createElement('DIV');
	newClient.id = 'client' + id;
	newClient.className = 'new_client';

	var clientChecked = document.createElement('INPUT');
	newClient.id = 'client' + id + 'checkbox';
	clientChecked.type = "checkbox";

	newClient.appendChild(clientChecked);
	newClient.appendChild(CreateInfo(name));
	newClient.appendChild(CreateInfo(alias));
	newClient.appendChild(CreateInfo(email));
	newClient.appendChild(CreateInfo(lang));
	newClient.appendChild(CreateInfo(numCustLic));
	newClient.appendChild(CreateInfo(numProjLic));
	newClient.appendChild(CreateInfo(licExpDate));
	return newClient;
}

function WriteClients(db)
{
	var clientContainer = document.getElementById("displayAllClients");
	for (var i = 0; i < db.length; i++)
	{
		var dbElement = db[i];
		clientContainer.appendChild(AddNewClientDiv(dbElement._id, dbElement.name, dbElement.alias, dbElement.email, dbElement.language, dbElement.number_customer_license, dbElement.number_project_license, dbElement.license_expiry_date));
	}
}

var json = JSON.stringify({
	"alias": "stud",
	'email': "stud@gmail.com",
	language: "English",
	license_expiry_date: "22.02.2000",
	name: "pgtu",
	number_customer_license: "2",
	number_project_license: "3",
	pass: "volgatech"
});

function OpenAddClientForm()
{
	document.getElementById("addClientForm").style.display = 'block';
}

function CloseAddClientForm()
{
	document.getElementById("addClientForm").style.display = 'none';
}


function AddClient()
{
	var data = "name=" + encodeURIComponent(document.getElementById("nameClientForm").value)
		+ "&alias=" + encodeURIComponent(document.getElementById("aliasClientForm").value)
		+ "&email=" + encodeURIComponent(document.getElementById("emailClientForm").value)
		+ "&pass=" + encodeURIComponent(document.getElementById("passClientForm").value)
		+ "&language=" + encodeURIComponent(document.getElementById("langClientForm").value)
		+ "&number_customer_license=" + encodeURIComponent(document.getElementById("numCustLicClientForm").value)
		+ "&number_project_license=" + encodeURIComponent(document.getElementById("numProjLicClientForm").value)
		+ "&license_expiry_date=" + encodeURIComponent(document.getElementById("licExpDateClientForm").value);

	const xhr = new XMLHttpRequest();
	xhr.open("POST", '/clients', true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
	xhr.send(data);

	CloseAddClientForm();
	DisplayClients();
}


function ClearDisplayClients()
{
	var node = document.getElementById("displayAllClients");
	while (node.hasChildNodes()) {
		node.removeChild(node.lastChild);
	}
}

function DisplayClients()
{
	ClearDisplayClients();
	const xhr = new XMLHttpRequest();
	xhr.open('GET', '/getclientsdb', false);
	xhr.send();
	if (xhr.status != 200) {
	  alert( xhr.status + ': ' + xhr.statusText );
	} 
	else {
		WriteClients(JSON.parse(xhr.responseText));
	}
}



/* Machines */


function OpenAddMachineForm()
{
	document.getElementById("addMachineForm").style.display = 'block';
}

function CloseAddMachineForm()
{
	document.getElementById("addMachineForm").style.display = 'none';
}

function AddMachine()
{
	var data = "name=" + encodeURIComponent(document.getElementById("nameMachineForm").value)
		+ "&ip=" + encodeURIComponent(document.getElementById("ipMachineForm").value)
		+ "&description=" + encodeURIComponent(document.getElementById("descMachineForm").value);

	const xhr = new XMLHttpRequest();
	xhr.open("POST", '/machines', true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
	xhr.send(data);
	CloseAddMachineForm();
	DisplayMachines();
}

function ClearDisplayMachines()
{
	var node = document.getElementById("displayAllMachines");
	while (node.hasChildNodes()) {
		node.removeChild(node.lastChild);
	}
}

function AddNewMachineDiv(id, name, ip, desc)
{
	var newMachine = document.createElement('DIV');
	newMachine.id = 'machine' + id;
	newMachine.className = 'new_client';

	var clientChecked = document.createElement('INPUT');
	clientChecked.type = "checkbox";

	newMachine.appendChild(clientChecked);
	newMachine.appendChild(CreateInfo(name));
	newMachine.appendChild(CreateInfo(ip));
	newMachine.appendChild(CreateInfo(desc));
	return newMachine;
}

function WriteMachines(db)
{
	var clientContainer = document.getElementById("displayAllMachines");
	for (var i = 0; i < db.length; i++)
	{
		var dbElement = db[i];
		clientContainer.appendChild(AddNewMachineDiv(dbElement._id, dbElement.name, dbElement.ip, dbElement.description));
	}
}

function DisplayMachines()
{
	ClearDisplayMachines();
	const xhr = new XMLHttpRequest();
	xhr.open('GET', '/getmachinesdb', false);
	xhr.send();
	if (xhr.status != 200) {
		alert( xhr.status + ': ' + xhr.statusText );
	}
	else {
		WriteMachines(JSON.parse(xhr.responseText));
	}
}