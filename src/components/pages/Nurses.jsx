import { useState, useEffect } from 'react';
import { users } from '../../datasets/users.js';
import '../../Styles/roles.css';

const useInterval = (f, delay) => {
  const [timer, setTimer] = useState(undefined);

  const start = () => {
    if (timer) return;
    console.log('started');
    setTimer(setInterval(f, delay));
  };

  const stop = () => {
    if (!timer) return;
    console.log('stopped', timer);
    setTimer(clearInterval(timer));
  };

  useEffect(() => stop, []);

  return [start, stop, timer != null];
};

function Nurses() {
  const [userName, setUserCode] = useState('');
  const [timerStarted, setTimerStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(-1);

  const total_analysis_time = 300;

  const [start, stop, running] = useInterval(
    () => setTimeRemaining((x) => x - 1),
    1000,
  );

  const handleChange = (e) => {
    setUserCode(e.target.value);
    setTimerStarted(false);
    setTimeRemaining(-1);
  };

  const onReduceTimeLeft = () => {
    setTimeRemaining((x) => x - 30);
  };

  const onStartAnalyse = () => {
    setTimeRemaining(total_analysis_time);
    setTimerStarted(true);
    start();
  };

  const onStopAnalyse = () => {
    setTimeRemaining(-1);
    setTimerStarted(false);
    stop();
  };

  const GetPatientInfo = (patient) => {
    const { id, firstName, lastName, geneticCode } = patient;
    const hackedGeneticCode = window.localStorage.getItem(id);

    if (!timerStarted) {
      return (
        <div>
          <button
            type="submit"
            className="login-button"
            onClick={onStartAnalyse}
          >
            Lancer l'analyse
          </button>
        </div>
      );
    } else if (timeRemaining > 0) {
      return (
        <div>
          <div className="roles-lines">
            <button className="fake-button" onDoubleClick={onReduceTimeLeft}>
              Analyse en cours, veuillez patienter...
            </button>
          </div>
          <div>Temps restant : {timeRemaining}s</div>
          <button
            type="submit"
            className="login-button"
            onClick={onStopAnalyse}
          >
            stopper l'analyse
          </button>
        </div>
      );
    } else {
      stop();
      return (
        <div>
          <div>Nom : {lastName}</div>
          <div>Prénom : {firstName}</div>
          <div>Contaminé : {hackedGeneticCode ? 'Oui' : 'non'}</div>
          <div>
            Code hyper-sommeil réel : {hackedGeneticCode || geneticCode}
          </div>
          <image></image>
        </div>
      );
    }
  };

  const GetPatientSection = () => {
    const patient = users.find(
      (u) => u.lastName.toLocaleLowerCase() == userName.toLocaleLowerCase(),
    );
    return (
      <div className="roles-content">
        {patient ? GetPatientInfo(patient) : 'Patient non trouvé...'}
      </div>
    );
  };

  return (
    <div className="roles-container">
      <div className="roles-title">Analyse médicale </div>
      <h2 className="roles-content">Saisissez le nom du patient :</h2>
      <input
        className="roles-inputBox"
        type="text"
        maxLength="20"
        value={userName}
        onChange={handleChange}
        placeholder="nom du patient"
      />
      {GetPatientSection()}
    </div>
  );
}

export default Nurses;
