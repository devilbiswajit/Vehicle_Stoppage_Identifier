export const fetchStoppageData = async () => {
    try {
      const response = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=_pLhdMY4ClRJK-_r8ESrmqsiJKF3mQLpzvHXGf9jFmK5ad1AyePktdEHYySVcYjVyOlmI1IQPHwjoHjtonRpVHXXSyTH41Spm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJ0sa135TeKQLj6-vJKJhDnBfdzHazyBSUxNO2cZDekum-fqoA7RC5fJVar4p5LwyNnqAsqxheso4pOuhDL3hmWJvGnAy1Cusg&lib=MvqUYhM2ku1QaoSQokeC-Q4TD2knUOGjU');
      const data = await response.json();
    //   console.log(data.data);
      return data.data;
    } catch (error) {
      console.error('Error fetching stoppage data:', error);
      return [];
    }
  };
 export const calculateStoppages = (data, thresholdMinutes) => {
  const stoppages = [];
  let currentStoppage = null;
  const thresholdMilliseconds = thresholdMinutes * 60 * 1000;

  data.forEach((point) => {
    const { latitude, longitude, speed, eventGeneratedTime } = point;

    if (speed === 0) {
      if (!currentStoppage) {
        currentStoppage = {
          latitude,
          longitude,
          reachTime: eventGeneratedTime,
          endTime: eventGeneratedTime,
        };
      } else {
        currentStoppage.endTime = eventGeneratedTime;
      }
    } else {
      if (currentStoppage) {
        const duration = currentStoppage.endTime - currentStoppage.reachTime;
        if (duration >= thresholdMilliseconds) {
          currentStoppage.duration = (duration / (1000 * 60)).toFixed(2);
          stoppages.push({ ...currentStoppage });
        }
        currentStoppage = null;
      }
    }
  });


  if (currentStoppage) {
    const duration = currentStoppage.endTime - currentStoppage.reachTime;
    if (duration >= thresholdMilliseconds) {
      currentStoppage.duration = (duration / (1000 * 60)).toFixed(2);
      stoppages.push({ ...currentStoppage });
    }
  }

  return stoppages;
};
