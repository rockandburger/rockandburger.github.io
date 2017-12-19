import {
	the,
	all,
	elementIsVisibleInViewport
} from './utils'

import {validations, typing, fuck} from './contactHelpers'

const emailsScript = document.createElement('script')
emailsScript.setAttribute('src', 'https://cdn.emailjs.com/dist/email.min.js')
document.body.appendChild(emailsScript)

const opts = {
	service: 'sendgrid',
	template: 'normal'
}

function sendEmail(args){

	emailjs.send(`${opts.service}`, `${opts.template}`, {
		name: args.name, 
		phone: args.phone, 
		email: args.email,
		message: args.msg
	}).then( response => {
		comemore()
		console.log("SUCCESS. status=%d, text=%s", response.status, response.text)
	})

}

function comemore(){
	alert('hey')
}

export default function contact() {

	const form = the('#form')

	const elements = {
		name : the('#form-name'),
		email : the('#form-email'),
		phone : the('#form-phone'),
		msg : the('#form-msg')
	}

	const inputs = Object.entries(elements) || false

	inputs.forEach(input => typing(input))

	const users = {
		one: 'user_FdLry3bEaHitVXIzllzcl',
		thom: 'user_kCkHRSMU0h4BVVSiBUB1T'
	}

	// init the plugin
	emailjs.init(users.one)

	// listeners
	form.addEventListener('submit', _ => {
		
		_.preventDefault()

		const args = {
			name: elements.name.value,
			email: elements.email.value,
			phone: elements.phone.value,
			msg: elements.msg.value
		}

		const errors = validations(args)

		if (errors.length === 0){
			sendEmail(args)
		}else{
			errors.forEach(error => fuck(error, elements))
		}

	})

}