import './style.css';

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

let citites = [];

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
  const typehead = new TypeAhead(searchform, suggestions, citites, data);
  typehead.init();
    
}), (error) => {
  console.log(`Error: ${error}`)
  }



class TypeAhead {
  constructor (form, suggest, citites, data) {
    this.form = form,
    this.suggest = suggest,
    this.citites = citites,
    this.data = data
  }
  
  init() {
    this.form.addEventListener('change', (e) => {
      let regex = new RegExp(e.target.value, 'gi');
      this.filterdata(regex);
    });
    this.form.addEventListener('keyup', (e) => {
      let regex = new RegExp(e.target.value, 'gi');
      this.filterdata(regex)
    });
  }

  filterdata(keyword) {
    const saveResultHere =  this.data.filter(word => {
      return word.state.match(keyword) || word.city.match(keyword);
    })
    this.displaydata(saveResultHere, keyword);
  }

  displaydata(searchedList, keyword) {
    let str = keyword.source; 
    let newlist = searchedList.map(ele => {
      const cityName = ele.city.toLowerCase().replace(str.toLowerCase(),
        `<span class='hl'>${str.toLowerCase()}</span>`);
      const stateName = ele.state.toLowerCase().replace(str.toLowerCase(),
        `<span class='hl'>${str.toLowerCase()}</span>`);
      const populations = ele.population.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      return `
      <li>
        <span>${cityName}, ${ele.state}</span>
        <span>${populations}</span>
      </li>
      `;
      
    }).join('');
    this.suggest.innerHTML = newlist;
  }
}


const searchform = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

















  // let searchedWords = [];
  // const searchform = document.querySelector('.search');
  // const suggestions = document.querySelector('.suggestions');

  // searchform.addEventListener('change', (e) => {
  //   let wordfilter = e.target.value;

  //   let searchedword2 = data.filter(word => {
  //     return word.city.match(wordfilter)
  //   })

  //   searchedword2.forEach(ele => {
  //     let newword =
  //       `
  //     <li>
  //       <span>${ele.city}, ${ele.state}</span> 
  //     </li>
  //     `;
  //     suggestions.innerHTML = newword;
  //   })
  // })