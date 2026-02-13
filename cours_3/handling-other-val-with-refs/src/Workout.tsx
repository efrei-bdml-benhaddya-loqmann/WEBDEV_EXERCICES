import { useEffect, useRef, useState } from "react";

interface WorkoutProps {
  title: string;
  description: string;
  time: number;
  onComplete: () => void;
}

export default function Workout({ title, description, time, onComplete }: WorkoutProps) {
  const [remainingTime, setRemainingTime] = useState(time); // Temps restant
  const [isActive, setIsActive] = useState(false); // État du chrono (true on/false off)
  const timerRef = useRef<number | null>(null); // Pour stocker l'ID du timer

  const resetTimer = () => {
    setRemainingTime(time);
    setIsActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }

  useEffect(() => {
    // Si le chrono est actif et qu'il reste du temps
    if (isActive && remainingTime > 0) {
      timerRef.current = window.setInterval(() => {
        setRemainingTime((prev) => prev - 1000); // On retire 1 seconde (1000ms)
      }, 1000);
    }
    else if (isActive && remainingTime <= 0) {
      // Temps écoulé !
      onComplete();
      resetTimer();
    }

    // NETTOYAGE : On arrête l'intervalle dès que le composant change 
    // ou que isActive passe à false. C'est VITAL pour éviter les bugs.
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, remainingTime, onComplete]);

  function handleStartWorkout() {
    setIsActive(true);
  }

  function handleStopWorkout() {
    onComplete();
    resetTimer();
  }

  // Conversion en secondes pour l'affichage
  const displayTime = (remainingTime / 1000).toFixed(0);

  return (
    <article className="workout">
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Temps initial : {time / 1000}s</p>

      {/* Affichage dynamique */}
      <div className="counter">
        <strong>Temps restant : {displayTime}s</strong>
      </div>

      <p>
        <button onClick={handleStartWorkout} disabled={isActive}>Start</button>
        <button onClick={handleStopWorkout} disabled={!isActive}>Stop</button>
      </p>
    </article>
  );
}