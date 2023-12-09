import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import api from "../../utils/MainApi";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Header from "../Header/Header";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

function App() {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getMovies()])
        .then(([userData, movies]) => {
          setCurrentUser(userData);
          setSavedMovies(movies);
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [isLoggedIn]);

  function closeInfoToolTip() {
    setInfoToolTipOpen(false);
  };

  function handleOverlay(evt) {
    if (evt.target === evt.currentTarger) {
      closeInfoToolTip();
    };
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("movies");
    localStorage.removeItem("movieSearch");
    localStorage.removeItem("shortMovies");
    localStorage.removeItem("allMovies");
    localStorage.clear();
    navigate("/");
  };

  function handleSubmitRegister({ email, password, name }) {
    api.createUser(email, password, name)
      .then(() => {
        setInfoToolTipOpen(true);
        setIsSuccess(true);
        handleSubmitLogin({ email, password });
      })
      .catch((err) => {
        console.log(err);
        setInfoToolTipOpen(true);
        setIsSuccess(false);
      });

  };

  function handleSubmitLogin({ email, password }) {
    setIsLoading(true);
    api.login(email, password)
      .then((res) => {
        if (res) {
          setInfoToolTipOpen(true);
          setIsSuccess(true);
          localStorage.setItem("jwt", res.token);
          navigate("/movies", { replace: true });
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoToolTipOpen(true);
        setIsSuccess(false);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  function handleUnauthorizedError(err) {
    if (err === "Error: 401") {
      handleSignOut();
    }
  };

  function handleUpdateUser({ email, name }) {
    setIsLoading(true)
    api.updateUserInfo(email, name)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
        handleUnauthorizedError(err);
      })
      .finally(() => {
        setIsLoading(false)
      });
  };

  function handleSaveMovie(data) {
    api.createMovie(data)
      .then((movie) => {
        setSavedMovies([movie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        handleUnauthorizedError(err);
      });
  };

  function handleDeleteMovie(card) {
    api.deleteMovie(card._id)
      .then(() => {
        setSavedMovies((state) => state.filter((item) => item._id !== card._id))
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        handleUnauthorizedError(err);
      });
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    console.log(jwt)
    if (jwt) {
      api.checkToken(jwt)
        .then((res) => {
          if (res) {
            localStorage.removeItem("allMovies");
            setIsLoggedIn(true)
          }
          navigate(pathname)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function handleEsc(evt) {
      if (evt.key === "Escape") {
        closeInfoToolTip();
      }
    }
    if (isInfoToolTipOpen) {
      document.addEventListener("keydown", handleEsc);
      return () => {
        document.removeEventListener("keydown", handleEsc)
      }
    }
  }, [isInfoToolTipOpen]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="wrapper">
        <Routes>
          <Route path="/" element={
            <>
              <Header loggedIn={isLoggedIn} />
              <Main />
            </>
          }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                path="/movies"
                loggedIn={isLoggedIn}
                component={Movies}
                savedMovies={savedMovies}
                handleDeleteMovie={handleDeleteMovie}
                handleSaveMovie={handleSaveMovie}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                path="/saved-movies"
                component={SavedMovies}
                loggedIn={isLoggedIn}
                savedMovies={savedMovies}
                handleDeleteMovie={handleDeleteMovie}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                path="/profile"
                component={Profile}
                onUpdateUser={handleUpdateUser}
                loggedIn={isLoggedIn}
                isLoading={isLoading}
                signOut={handleSignOut}
              />
            }
          />
          <Route path="/signup" element={
            isLoggedIn
              ? (<Navigate to="/movies" replace />)
              : (<Register onRegister={handleSubmitRegister} isLoading={isLoading} />)}
          />
          <Route path="/signin" element={
            isLoggedIn
              ? (<Navigate to="/movies" replace />)
              : (<Login onLogin={handleSubmitLogin} isLoading={isLoading} />)}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          isSuccess={isSuccess}
          onClose={closeInfoToolTip}
          handleOverlay={handleOverlay}
        />
      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;
