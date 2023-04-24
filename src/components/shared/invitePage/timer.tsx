import { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';

function MyTimer({ expiryTimestamp }: any) {
  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn('onExpire called'),
  });

  useEffect(() => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + Number(process.env.REACT_APP_INVITE_PAGE_TIMER_SECONDS));
    restart(time);
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}

export default MyTimer;
