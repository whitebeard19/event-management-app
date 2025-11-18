import { useAuth } from '../auth/AuthContext';
import { Navigate } from 'react-router';

const ProtectedRoute = ({children}) => {
    const {currentUser} = useAuth();
    
    if (!currentUser) return <Navigate to="/login" replace/>

    return children;
}

export default ProtectedRoute;