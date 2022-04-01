import './style.css';

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';


const searchIt = () => new Promise((resolve, reject) => {
  const request = new XMLHttpRequest();

  request.addEventListener('readystatechange', (e) => {
    if (e.target.readystate === 4 || e.target.status === 200) {
      const data = JSON.parse(e.target.responseText)
      resolve(data);
    } else if (e.target.readystate === 4) {
      reject('error occured at xmlhttprequest level')
    }
  })


  request.open('GET', endpoint);
  request.send();
})

searchIt().then((data) => {
  console.log(data);
}), (error) => {
  console.log(`Error: ${error}`)
}
