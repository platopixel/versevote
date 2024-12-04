import 'server-only';
import { handleLogout } from '@/lib/auth/signOutServerAction';

function Logout() {
    return (
        <form
            action={handleLogout}
        >
            <button type="submit">Sign Out</button>
        </form>
    )
}

export default Logout;