import Wrapper from '../components/UI/Wrapper'
import EmailForm from '@/components/EmailForm'

export default function ResetPassEmail() {
	return (
		<Wrapper header={'Reset Password'} style={{ minHeight: '80dvh' }}>
			<EmailForm />
		</Wrapper>
	)
}
