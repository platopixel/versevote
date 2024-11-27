import { handleGoogleSignIn } from '@/lib/auth/googleSignInServerAction';

function Login() {
    return (
        <form
            action={handleGoogleSignIn}
        >
            <button type="submit">Sign in with Google</button>
        </form>
    )
}

export default Login;