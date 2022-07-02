import React, {useState, useEffect} from "react";
import styles from './App.module.scss'
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import List from "./components/List/List";
import Modal from "./components/Modal/Modal";
import Menu from "./components/Menu/Menu";
import usersStore from "./zustand/usersStore";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
const App = () => {
    const user = usersStore((state) => state.user)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isLoaded, setisLoaded] = useState(false)
    const [entryAnimationEnded, setEntryAnimationEnded] = useState(false)
    const [showContent, setShowContent] = useState(false)
    /// making sure entry animation was played and everything loaded
    useEffect(() => {setTimeout(() => setEntryAnimationEnded(true), 1200)}, [])
    /// checking is user logged
    const isLogged = usersStore((state) => state.user.length !== 0)
    const checkLogin = usersStore((state) => state.checkLogin)
    useEffect(() => {
        isLogged ? setIsModalOpen(false) : setIsModalOpen(true); setIsMenuOpen(false)}, [isLogged])
    useEffect(() => {checkLogin(setisLoaded)}, [])
    /// if user everything is checked and loaded show content
    useEffect(() => {
        if(entryAnimationEnded && isLoaded){
            setShowContent(true)
        }
    },[isLoaded, entryAnimationEnded])
    return(
        <BrowserRouter>
        <div className={styles.wrapper}>
            {showContent ? <>{isLogged && <Header setIsMenuOpen={setIsMenuOpen}/>}
            {isLogged && <Nav setIsModalOpen={setIsModalOpen} />}
            {isLogged ? <Routes>
                <Route path="*" element={<Navigate to="/tasks" replace />} />
                <Route path="/tasks/*" element={<List setIsModalOpen={setIsModalOpen} />} />
                <Route path="/statistics" element={<List />} />
                {user.isAdmin && <Route path="/users/*" element={<List setIsModalOpen={setIsModalOpen}/>} />}
            </Routes> : <Routes>
                <Route path="*" element={<Navigate to="/logIn" replace />} />
                <Route path="/logIn" element={<List />} />
                <Route path="/logIn" element={<List />} />
                </Routes>}
            <Modal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}/>
            <Menu setIsMenuOpen={setIsMenuOpen} isLogged={isLogged} isMenuOpen={isMenuOpen}/> </> : 
            <LoadingScreen />}
        </div>
        </BrowserRouter>
    )
}

export default App