import domainPath from "../../domainPath";
import { useEffect, useContext, useState, useCallback } from "react";
import { useHistory, Route, Switch, useParams } from "react-router-dom";

import RedeemPrizes from "../Prize/RedeemPrizes";
import SessionsHistory from "./Sessions/SessionsHistory";
import EditUserModal from "../../components/UI/EditUserModal";
import ReaderHome from "../../components/Reader/ReaderHome";
import ReaderLogSession from "../../components/Reader/ReaderLogSession";

import AuthContext from "../../store/auth-contex";
import ReaderContext from "../../store/reader-contex";
import ReaderSummary from "./ReaderSummary";
import ProtectedRoute from "../../components/Auth/ProtectedRoute";

const Reader = () => {
  const history = useHistory();

  const authCtx = useContext(AuthContext);
  const readerCtx = useContext(ReaderContext);

  const [error, setError] = useState("");

  const [reader, setReader] = useState();

  const [editIsOpen, setEditIsOpen] = useState(false);
  const [sessionHistoryIsOpen, setSessionHistoryIsOpen] = useState(false);
  const [earnedPrizesIsOpen, setEarnedPrizesIsOpen] = useState(false);

  const params = useParams();
  const readerId = params.id;

  useEffect(() => {
    const url = `${domainPath}/reader/${readerId}`;
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + authCtx.token,
      },
    };
    const fetchReader = async () => {
      const res = await fetch(url, requestOptions);

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await res.json();

      const loadedReader = resData.reader;

      setReader(loadedReader);
    };
    fetchReader().catch((err) => setError(err.msg));
  }, [readerId, authCtx.token, readerCtx.isUpdated]);

  const handleUpdateUser = () => {
    setEditIsOpen(true);
  };

  const handleStartLogReading = () => {
    history.push(`/reader/${readerId}/log/`);
  };

  const handleStopLogReading = () => {
    history.push(`/reader/${readerId}/home/`);
  };

  const handleDisplayLogHistory = () => {
    setEarnedPrizesIsOpen(false);
    setSessionHistoryIsOpen(true);
  };

  const handleDisplayEarnedPrizes = () => {
    setSessionHistoryIsOpen(false);
    setEarnedPrizesIsOpen(true);
  };

  return (
    <>
      {!error && reader && (
        <>
          <Switch>
            <ProtectedRoute path={"/reader/:id/home/"} exact>
              <ReaderHome reader={reader} />
            </ProtectedRoute>

            <ProtectedRoute path={"/reader/:id/log"}>
              <ReaderLogSession
                reader={reader}
                onStopLogging={handleStopLogReading}
              />
            </ProtectedRoute>

            <Route path={"/reader/:id/"}>
              <ReaderSummary
                reader={reader}
                updateUser={handleUpdateUser}
                displayHistory={handleDisplayLogHistory}
                displayPrizes={handleDisplayEarnedPrizes}
                startReading={handleStartLogReading}
              />
              {sessionHistoryIsOpen && (
                <SessionsHistory
                  token={authCtx.token}
                  readerId={readerId}
                  readerName={reader.reader_name}
                />
              )}
              {earnedPrizesIsOpen && <RedeemPrizes readerId={readerId} />}
            </Route>
          </Switch>

          <EditUserModal
            open={editIsOpen}
            onClose={() => setEditIsOpen(false)}
            reader={reader}
          />

          {error && <p>{error}</p>}
        </>
      )}
    </>
  );
};

export default Reader;
