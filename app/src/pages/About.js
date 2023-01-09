import ReactMarkdown from 'react-markdown'
import { useState, useEffect } from 'react'
import TermsOfUse from '../markdown/README.md'

const About = () => {

	const [tosText, setTosText] = useState('')

	// Fetch Terms of Use
	useEffect(() => {
		fetch(TermsOfUse).then(res => res.text()).then(text => setTosText(text))
	})

	return (
		<div>
			<ReactMarkdown children={tosText} className={'markdown'}/>
		</div>
	)
};

export default About;
