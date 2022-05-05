import { Routes, Route, useLocation } from 'react-router-dom';
import CategoryContextProvider from './context/CategoryContext';
import { MovieInfo } from './MovieInfo';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { useQuery } from 'react-query';
import { getAuthorization } from './request/request';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { Info } from './auth/Info';
import { Login } from './auth/Login';
import { Signup } from './auth/Signup';
import { SelectCategory } from './category/SelectCategory';
import { DisplayPerCategory } from './category/DisplayPerCategory';
import { Liked } from './liked/Liked';
import { Watched } from './watched/Watched';
import { Playlist } from './playlist/Playlist';

function App() {
    const location = useLocation();
    const _ = useQuery('authToken', getAuthorization, {
        onSuccess: data => setAuthToken(data.data.auth_token),
        refetchInterval: 7200000
    });
    const { setAuthToken, accessToken } = useContext(AuthContext);

    return (
        <>
            {!accessToken ? (
                <AnimateSharedLayout>
                    <AnimatePresence exitBeforeEnter>
                        <Routes location={location} key={location.pathname}>
                            <Route path='/' element={<Info />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/signup' element={<Signup />} />
                            <Route path='/*' element={<Info />} />
                        </Routes>
                    </AnimatePresence>
                </AnimateSharedLayout>
            ) : (
                <CategoryContextProvider>
                    <AnimateSharedLayout>
                        <AnimatePresence exitBeforeEnter>
                            <Routes location={location} key={location.pathname}>
                                <Route path='/categories' element={<SelectCategory />} />
                                <Route path='/movie' element={<DisplayPerCategory />} />
                                <Route path='/movie/:id' element={<MovieInfo />} />
                                <Route path='/liked' element={<Liked />} />
                                <Route path='/watched' element={<Watched />} />
                                <Route path='/playlist' element={<Playlist />} />
                                <Route path='/*' element={<DisplayPerCategory />} />
                            </Routes>
                        </AnimatePresence>
                    </AnimateSharedLayout>
                </CategoryContextProvider>
            )}
        </>
    );
}

export default App;
