import './App.css';
import { useState, useEffect } from 'react';
const descriptionText = 'The end to a longing for celebration and devotion';
const informationMap = {
  '1600': 'The festival was publicly celebrated in Pune since the era of Chhatrapti Shivaji Maharaj',
  '1700': 'The Peshwas were devotees of Lord Ganesha and started celebrating the festival publicly in the capital city of Pune',
  '1892': 'Bhausaheb Javale installed the first Ganesh Idol publicly in Pune',
  '1893': 'Tilak started by celebrating the festival publicly for the first time in Pune and Girgaon, Mumbai',
  '2024': 'One of the biggest festivals in Maharashtra and the entire country. The roads are lit, feasts are offered with a series of such joyous events'
}

function App() {

  const [headingTop, setHeadingTop] = useState(50);
  const [mainContentTop, setMainContentTop] = useState(100);
  const [scroll, setScroll] = useState();
  const [headingColor, setHeadingColor] = useState('white');
  const [wordOpacity, setWordOpacity] = useState(1);
  const [upwardTransform, setUpwardTransform] = useState(-50);
  const [downwardTransform, setDownwardTransform] = useState(-50);
  const [yearInfo, setYearInfo] = useState('');

  const handleScroll = () => {
    setScroll(window.scrollY);

    if (window.scrollY <= 0) {
      setHeadingTop(50);
      setMainContentTop(100);
    }

    if (window.scrollY < 1200) {
      setHeadingColor('white');
    }

    if (window.scrollY > 1200) {
      setHeadingColor('black');
    }

    if (window.scrollY > 0 && window.scrollY < 2000) {
      handleHeadingTop();
      handleMainContentTop();
    }

    if (window.scrollY > 2000 && window.scrollY < 3000) {
      setHeadingTop(15);
      setMainContentTop(0);
      setDownwardTransform(-50);
      setUpwardTransform(-50);
      setWordOpacity(1);
    }

    if (window.scrollY > 3000 && window.scrollY < 4000) {
      handleWords();
    }

    if (window.scrollY > 5000 && window.scrollY < 6000) {
      setYearInfo('1600');
    }

    if (window.scrollY > 6000 && window.scrollY < 7000) {
      setYearInfo('1700');
    }

    if (window.scrollY > 7000 && window.scrollY < 8000) {
      setYearInfo('1892');
    }

    if (window.scrollY > 8000 && window.scrollY < 9000) {
      setYearInfo('1893');
    }

    if (window.scrollY > 9000 && window.scrollY < 10000) {
      setYearInfo('2024');
      setMainContentTop(0);
    }

    if (window.scrollY > 10000 && window.scrollY < 12000) {
      handleClosing();
    }

    if (window.scrollY > 10500) {
      setHeadingColor('white');
    }
  }

  const handleHeadingTop = () => {
    setHeadingTop(((-35 / 2000) * (window.scrollY - 2000)) + 15);
  }

  const handleMainContentTop = () => {
    setMainContentTop((-1 / 20) * (window.scrollY - 2000));
  }

  const handleWords = () => {
    setWordOpacity((-1 / 1000) * (window.scrollY - 4000));
    setUpwardTransform(((-1 / 20) * (window.scrollY - 4000)) - 100);
    setDownwardTransform(((15 / 100) * (window.scrollY - 4000)) + 100);
  }

  const handleClosing = () => {
    setHeadingTop(((35 / 2000) * (window.scrollY - 12000)) + 50);
    setMainContentTop(((1 / 20) * (window.scrollY - 12000) + 100));
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  })

  return (
    <div className="App">
      <div className="heading" style={{ top: `${headingTop}%`, color: `${headingColor}` }}>
        <div className="ganesh">ganesh</div>
        <div className="otsav">otsav</div>
      </div>

      {scroll < 12000 && <div className="main-content" style={{ top: `${mainContentTop}%` }}>
        {scroll > 2500 && scroll < 4100 && <div className="description">
          {descriptionText.split(" ").map((word, index) => (
            index % 2 === 0 ? <div className="word"
              style={{
                opacity: `${wordOpacity}`,
                transform: `translate(0%, ${upwardTransform}%)`
              }}>{word}</div>
              :
              <div className="word" style={{
                opacity: `${wordOpacity}`,
                transform: `translate(0%, ${downwardTransform}%)`
              }}>{word}</div>
          ))}
        </div>}
        {scroll > 5000 && scroll < 10000 && <div className="timeline">
          {scroll > 5000 && scroll < 10000 && <div className="about-timeline">about</div>}
          <div className="timeline-map">
            {Object.keys(informationMap).map((year) => (
              <div className="timeline-card">
                <div className="year-timeline-card"
                  style={{
                    fontSize: `${window.matchMedia("(orientation: portrait)").matches
                      ? yearInfo === year ?
                        '1.8rem' : '1rem'
                      : yearInfo === year
                        ? '3.5rem' : '3rem'}`,
                    color: `${yearInfo === year ? 'black' : 'rgb(144, 144, 144)'}`,
                    fontStyle: `${yearInfo === year ? 'bolder' : 'normal'}}`
                  }}>{year}</div>
              </div>
            ))}
          </div>
          {yearInfo && <div className="timeline-information">{informationMap[yearInfo]}</div>}
        </div>}
      </div>}
      {scroll > 12000 && <div className="message">may the modaks treat you well this season</div>}
    </div>
  );
}

export default App;
