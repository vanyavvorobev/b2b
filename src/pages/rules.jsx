import TextBlock from '@/containers/TextBlock'
import useAuthentication from '@/hooks/useAuthentication'

export default function RulesPage() {
	useAuthentication(false)
	return (
		<TextBlock
			header={'Rules'}
			text={`
						Before you (our Community Member and/or potential Community Member) register on the https://bee2bee.online website, we kindly ask you to carefully read our Public Offer Agreement, Privacy Policy, and Accept this Disclosure. This Disclosure is for informational purposes only and should not be considered as an exhaustive list. By registering on the https://bee2bee.online website, you confirm the full acceptance of the terms and conditions of the Gifting Platform.
I, as a Community Member and/or potential Community Member, confirm that I am familiar with the existing types of risks:

Technical risks 
1. I have no financial and moral claims against the Platform in the event of a failure, malfunction, interruption of the website https://bee2bee.online , disconnection or malicious behavior of information, communication, electrical, electronic, or other systems.
2. I acknowledge that any third-party attacks on the Platform Systems that result in disruption of services or loss of funds are beyond the liability of the Platform, and any losses resulting from such attacks will not be compensated by the Platform. The Service undertakes to take all reasonable measures to reject such attacks and ensure the gift exchange process.
3. I acknowledge that when making transactions by phone, I may encounter difficulties in contacting the operator, especially during peak hours.
4. I may suffer financial loss if the above risks materialize, and I acknowledge that I am liable for all losses that I may incur.

Risks associated with the peculiarities of the legislation of individual countries.
1. I accept responsibility for all activities on the https://bee2bee.online website carried out in countries where they are restricted or prohibited by law.
2. I confirm that my use of the Platform's services is in full compliance with all laws, regulations and directives in force in my country of residence.

Communication risks 
1. I am aware that information sent via unencrypted email may be accessed by unauthorized persons.
2. I am responsible for the security of my account credentials and for all sensitive information that I submit. The platform is not responsible for financial losses associated with the disclosure of this information to third parties.

Third party risks
1. The platform does not bear any responsibility for any of my losses resulting from the insolvency, bankruptcy, or incapacity of the financial institution in which my funds will be stored.
2. I acknowledge that the Platform does not take part in the donation process, but only reflects the order and structure of this process.

No guarantee of profit
1. I confirm that I know, accept and understand the fact that the Platform does not engage in and does not provide me with any financial benefits and earnings, since its activity consists only in DISPLAYING INFORMATION OF THE GIFTING PROCESS between Community Members.
2. I confirm that I give gifts to other Community Members free of charge and do not expect anything in return.
3. I am solely responsible for all actions that I carry out through the https://bee2bee.online website and have no moral and/or financial claims against the Platform Administration.
4. I confirm my intentions to join the community and become a Community Member and confirm that I have read and accept the terms of the Public Offer Agreement, the Privacy Policy and the risks set forth in this Disclosure.

	`}
		/>
	)
}
